const resultados = require('./resultados');

const allTeam = () => {
  const all = [];
  const result = resultados.map((play) => {
    const casaTeams = play.casa;
    const visitanteTeams = play.visitante;
    all.push(casaTeams, visitanteTeams);
  });
  return new Set(all);
};

const playTimes = (team) => {
  const timesCasa = resultados.filter((play) => play.casa === team).length;
  const timesVisitante = resultados.filter((play) => play.visitante === team).length;
  return timesCasa + timesVisitante;
};

const victoryTimes = (team) => {
  const victoryCasa = resultados.filter(
    (play) => team === play.casa && play.gols_casa > play.gols_visitante,
  ).length;
  const victoryVisitante = resultados.filter(
    (play) => team === play.visitante && play.gols_casa < play.gols_visitante,
  ).length;
  return victoryCasa + victoryVisitante;
};

const empateTimes = (team) => {
  const empateCasa = resultados.filter(
    (play) => team === play.casa && play.gols_casa === play.gols_visitante,
  ).length;
  const empateVisitante = resultados.filter(
    (play) => team === play.visitante && play.gols_casa === play.gols_visitante,
  ).length;

  return empateCasa + empateVisitante;
};

const defeatTimes = (team) => {
  const defeatCasa = resultados.filter(
    (play) => team === play.casa && play.gols_casa < play.gols_visitante,
  ).length;
  const defeatVisitante = resultados.filter(
    (play) => team === play.visitante && play.gols_casa > play.gols_visitante,
  ).length;
  return defeatCasa + defeatVisitante;
};

const totalPoints = (victorys, draw) => {
  const victoryPoints = victorys * 3;
  const drawPoints = draw * 1;
  return victoryPoints + drawPoints;
};

const printConsole = (arrObj) => {
  const newArr = arrObj.sort((a, b) => b.points - a.points);
  console.table(newArr);
};

const mainTest = () => {
  const obj = {};
  const arr = [];
  const allTeams = allTeam();
  allTeams.forEach((team) => {
    const times = playTimes(team);
    const victorys = victoryTimes(team);
    const draw = empateTimes(team);
    const defeat = defeatTimes(team);
    const points = totalPoints(victorys, draw);

    arr.push({
      team: team,
      points: points,
      game: times,
      victorys: victorys,
      draw: draw,
      defeat: defeat,
    });
  });
  printConsole(arr);
};

mainTest();
// // Exibir pelo console (terminal) a tabela de classificação do campeonato, com pontos, vitórias, empates e derrotas, conforme imagem anexa abaixo.
// console.log(resultados);
