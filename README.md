# Game Balancer

> 🕹️ A fair match generator for **League of Leagends** and **Valorant** that divides 10 players into two balanced teams based on their **tiers and points**.
<div align=center>
  <img src="https://github.com/user-attachments/assets/c1f7cf12-523c-4581-ab0a-2e3a95b74f82" alt="GBlogo" height="100" />
  <img src="https://github.com/user-attachments/assets/ecd4bacb-06c1-4bd9-bdad-34fa12f65ad6" alt="Valorant" height="100" />
  <img src="https://github.com/user-attachments/assets/8c814e0e-3f97-4ed3-96a3-4a3161549520" alt="LeagueOfLegends" height="100" />
</div>
<br>
<div align=center style="text-align: center; gap:20">
  <img src="https://github.com/user-attachments/assets/a1a17488-b867-498e-94ea-7d6d83930229" alt="SelectGame" width="900" />
</div>

## Features
- 🏅 **Player Tier Input**: Select each player's rank.
- ⚖️ **Fair Team Generation**: Automatically create two balanced teams based on player points.
- 📊 **Result**: Displays the generated teams and their total points in a modal.


***

## Project Structure
```
src
├── assets
├── components
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── logo.jpg
│   ├── OnBoarding.jsx
│   ├── PlayerLol.jsx
│   ├── PlayerVlrt.jsx
│   ├── ResultModal.jsx
│   ├── Spinner.jsx
│   ├── WarningModal.jsx
├── pages
│   ├── Home.jsx
│   ├── Lol.jsx
│   ├── Vlrt.jsx
├── styles
│   ├── constants.json
│   ├── index.css
│   ├── players.scss
│   ├── reset.scss
├── util
│   ├── teamGenerator.js
│   ├── tierPoints.js
├── App.jsx
├── index.js
```
---

## Algorithm for Team Generation

- The **tiers are mapped to points** as follows:
  - Valorant
  ```
  Iron: 7, Bronze: 13, Silver: 17, Gold: 25, Platinum: 29, Diamond: 37, Ascendant: 43, Immortal: 45, Radiant: 48
  ```
  - League of Legends
  ```
  Iron: 7, Bronze: 13, Silver: 17, Gold: 25, Platinum: 32, Emerald: 40, Diamond: 48, Master: 54, GrandMaster: 59, Challenger: 64,
  ```
- The players are **sorted by points** in descending order.
