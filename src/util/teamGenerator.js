import { tierToPoints_lol } from "./tierPoints";

export const generateVlrtTeams = (players) => {
  const combinations = (arr, k) => {
    if (k === 0) return [[]];
    if (arr.length === 0) return [];
    const [first, ...rest] = arr;
    const combsWithFirst = combinations(rest, k - 1).map((comb) => [
      first,
      ...comb,
    ]);
    const combsWithoutFirst = combinations(rest, k);
    return [...combsWithFirst, ...combsWithoutFirst];
  };

  const allTeam1Combinations = combinations(players, 5);
  let optimalTeams = null;
  let minDifference = Infinity;

  allTeam1Combinations.forEach((team1) => {
    const team2 = players.filter((player) => !team1.includes(player));
    const team1Pts = team1.reduce((sum, player) => sum + player.pts, 0);
    const team2Pts = team2.reduce((sum, player) => sum + player.pts, 0);
    const difference = Math.abs(team1Pts - team2Pts);

    if (difference < minDifference) {
      minDifference = difference;
      optimalTeams = { team1, team1Pts, team2, team2Pts };
    }
  });

  const sortedTeam1 = optimalTeams.team1.sort((a, b) => b.pts - a.pts);
  const sortedTeam2 = optimalTeams.team2.sort((a, b) => b.pts - a.pts);

  return { ...optimalTeams, team1: sortedTeam1, team2: sortedTeam2 };
};
///////
//////
/////
export const generateLolTeams = (players) => {
  const positions = ["top", "jungle", "mid", "adc", "support"];

  // 포지션별로 플레이어를 분류하고 점수 기준으로 정렬
  const playersByPosition = positions.reduce((acc, position) => {
    acc[position] = players
      .filter(
        (player) =>
          (player.selectedLanes || []).includes(position) &&
          player.tier &&
          tierToPoints_lol[player.tier] &&
          tierToPoints_lol[player.tier][position] > 0,
      )
      .map((player) => ({
        ...player,
        pts: tierToPoints_lol[player.tier][position], // 포지션별 점수 반영
      }))
      .sort((a, b) => b.pts - a.pts); // 높은 점수 순으로 정렬
    return acc;
  }, {});

  // 모든 포지션에 최소 2명의 플레이어가 있는지 검증
  const missingOrInsufficientPositions = positions.filter(
    (position) => playersByPosition[position].length < 2,
  );
  if (missingOrInsufficientPositions.length > 0) {
    return {
      team1: [],
      team1Pts: 0,
      team2: [],
      team2Pts: 0,
      largeDifference: false,
      missingOrInsufficientPositions,
    };
  }

  let optimalTeams = null;
  let minDifference = Infinity;

  // 재귀적으로 팀을 생성하여 최적의 조합 찾기
  const generateTeams = (
    positionIndex,
    team1,
    team2,
    team1Pts,
    team2Pts,
    usedPlayers,
  ) => {
    if (positionIndex === positions.length) {
      const difference = Math.abs(team1Pts - team2Pts);

      // 최적의 팀 조합 업데이트
      if (difference < minDifference) {
        minDifference = difference;
        optimalTeams = {
          team1: [...team1],
          team2: [...team2],
          team1Pts,
          team2Pts,
          largeDifference: difference > 10, // 점수 차이가 클 경우 플래그 설정
        };
      }
      return;
    }

    const position = positions[positionIndex];
    const playersForPosition = playersByPosition[position];

    // 가능한 모든 조합을 탐색
    for (let i = 0; i < playersForPosition.length; i++) {
      const playerForTeam1 = playersForPosition[i];
      if (usedPlayers.has(playerForTeam1.playerName)) continue;

      for (let j = 0; j < playersForPosition.length; j++) {
        const playerForTeam2 = playersForPosition[j];
        if (
          playerForTeam1.playerName === playerForTeam2.playerName ||
          usedPlayers.has(playerForTeam2.playerName)
        )
          continue;

        // 플레이어를 팀에 추가
        usedPlayers.add(playerForTeam1.playerName);
        usedPlayers.add(playerForTeam2.playerName);

        generateTeams(
          positionIndex + 1,
          [...team1, { ...playerForTeam1, position }],
          [...team2, { ...playerForTeam2, position }],
          team1Pts + playerForTeam1.pts,
          team2Pts + playerForTeam2.pts,
          usedPlayers,
        );

        // 플레이어를 팀에서 제거
        usedPlayers.delete(playerForTeam1.playerName);
        usedPlayers.delete(playerForTeam2.playerName);
      }
    }
  };

  generateTeams(0, [], [], 0, 0, new Set());

  if (!optimalTeams) {
    return {
      team1: [],
      team1Pts: 0,
      team2: [],
      team2Pts: 0,
      largeDifference: false,
      missingOrInsufficientPositions: positions,
    };
  }

  // 팀을 포지션 순서대로 정렬
  const sortTeamByPosition = (team) => {
    return team.sort(
      (a, b) => positions.indexOf(a.position) - positions.indexOf(b.position),
    );
  };

  return {
    team1: sortTeamByPosition(optimalTeams.team1),
    team1Pts: optimalTeams.team1Pts,
    team2: sortTeamByPosition(optimalTeams.team2),
    team2Pts: optimalTeams.team2Pts,
    largeDifference: optimalTeams.largeDifference,
    missingOrInsufficientPositions: [],
  };
};
