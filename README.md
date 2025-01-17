# Game Balancer

[Go to GameBalancer page >](https://gamebalancer.netlify.app/)  
> 🕹️ A fair match generator for **League of Legends** and **Valorant** that divides 10 players into two balanced teams based on their **tiers and points**.

<div align="center">
  <img src="https://github.com/user-attachments/assets/fcd3ec08-5f2c-4fb7-b126-775196f77dd7" alt="GB Logo" height="100" style="margin: 0 20px;" />
  <img src="https://github.com/user-attachments/assets/ecd4bacb-06c1-4bd9-bdad-34fa12f65ad6" alt="Valorant Logo" height="100" style="margin: 0 20px;" />
  <img src="https://github.com/user-attachments/assets/8c814e0e-3f97-4ed3-96a3-4a3161549520" alt="League of Legends Logo" height="100" style="margin: 0 20px;" />
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/a1a17488-b867-498e-94ea-7d6d83930229" alt="Select Game Screen" width="900" style="margin-top: 20px;" />
</div>

---

## 🔧 Features

### ✨ Key Features
- 🏅 **Player Tier Input**: Easily select each player's rank and lane preferences.
- ⚖️ **Fair Team Generation**: Automatically create two balanced teams based on player points.
- 📊 **Results Display**: View the balanced teams and their total points in an intuitive modal.

---

## 📂 Project Structure

```plaintext
src
├── assets
├── components
│   ├── Footer.jsx
│   ├── Header.jsx
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

## 🧮 Team Generation Algorithm

### 🎮 Tier-to-Points Mapping:

#### Valorant
| **Tier**     | **Points** |
|--------------|------------|
| Iron         | 7          |
| Bronze       | 13         |
| Silver       | 17         |
| Gold         | 25         |
| Platinum     | 29         |
| Diamond      | 37         |
| Ascendant    | 43         |
| Immortal     | 45         |
| Radiant      | 48         |

#### League of Legends
| **Tier**        | **Top** | **Jungle** | **Mid** | **ADC** | **Support** |
|------------------|---------|------------|---------|---------|-------------|
| Challenger       | 56      | 63         | 61      | 58      | 55          |
| GrandMaster      | 46      | 51         | 49      | 44      | 41          |
| Master           | 39      | 43         | 41      | 36      | 37          |
| Diamond          | 32      | 35         | 32      | 30      | 31          |
| Emerald          | 25      | 27         | 25      | 24      | 23          |
| Platinum         | 21      | 20         | 19      | 18      | 16          |
| Gold             | 15      | 14         | 13      | 12      | 11          |
| Silver           | 13      | 12         | 10      | 9       | 8           |
| Bronze           | 11      | 7          | 8       | 8       | 7           |
| Iron             | 7       | 4          | 4       | 4       | 6           |

---

## ❓ How to Use

### 🚀 Quick Steps

1. **Select Your Game**  
   Choose either **League of Legends** or **Valorant** to create a balanced match.  
   <img src="https://github.com/user-attachments/assets/7a6c18db-a2ec-4f2e-a8b5-0cb24e1f59f0" alt="Game Selection" width="800" style="margin-top: 20px;" />

2. **Input Player Data**  
   - **Ranks and Positions**: Input player tiers and select their lanes (for League of Legends).  
   - **Defaults**: Players without a tier selection are assigned the lowest tier by default.  
     <img src="https://github.com/user-attachments/assets/373d9e63-823e-4487-9625-0f70650acb61" alt="Player Input Screen" width="800" style="margin-top: 20px;" />

3. **Generate Fair Match**  
   Click the **Generate Fair Match!** button to view the results in a modal.  
   <button style="background-color: #fa5c5c; color: #fff; padding: 10px; border-radius: 5px; margin-top: 20px;">Generate Fair Match!</button>

---

## 📧 Contact

If you have questions or suggestions, feel free to reach out:  
📧 Email: **scy0723123@gmail.com**  
📱 GitHub: [cxaosdev](https://github.com/cxaosdev)

