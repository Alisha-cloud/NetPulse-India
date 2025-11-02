export const estimateImpact = (durationHours = 1, state = "India", type = "shutdown") => {
  // Approx. GDP in ₹Cr (for proportional loss)
  const stateGDP = {
    Maharashtra: 400, Rajasthan: 160, Kerala: 150, Delhi: 450,
    Karnataka: 380, Gujarat: 300, "Tamil Nadu": 320, India: 2900,
  };

  // Base population (for user impact estimation)
  const statePop = {
    Maharashtra: 124000000,
    Rajasthan: 81000000,
    Kerala: 35000000,
    Delhi: 32000000,
    Karnataka: 68000000,
    Gujarat: 72000000,
    "Tamil Nadu": 76000000,
    India: 1400000000,
  };

  const gdp = stateGDP[state] || 100;
  const pop = statePop[state] || 50000000;

  //  GDP loss rate — throttling is less severe
  const lossMultiplier = type === "shutdown" ? 0.015 : 0.005;
  const loss = gdp * lossMultiplier * (durationHours / 24);

  //  User impact — throttling affects fewer users
  const userMultiplier = type === "shutdown" ? 0.04 : 0.015;
  const affectedUsers = Math.floor(pop * userMultiplier * (durationHours / 24));

  return {
    loss: `₹${loss.toFixed(2)} Cr`,
    affectedUsers: affectedUsers > 0 ? affectedUsers : "N/A",
  };
};