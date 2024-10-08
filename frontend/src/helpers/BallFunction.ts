// const handleClickRun = (run: number) => {
//     setBallData((prev) => ({
//       ...prev,
//       runs: run,
//       extras: {
//         wide: false,
//         noBall: false,
//         byes: false,
//         legByes: false,
//         overthrow: false,
//       },
//       isLegal: true,
//     }));
//   };

//   const handleExtraClick = (extra: keyof IExtras) => {
//     setBallData((prev) => ({
//       ...prev,
//       extras: {
//         ...prev.extras,
//         [extra]: !prev.extras[extra],
//       },
//       isLegal: extra === 'wide' || extra === 'noBall' ? false : true,
//     }));
//   };

//   const handleWicketClick = () => {
//     setBallData((prev) => ({
//       ...prev,
//       wicket: true,
//       extras: {
//         wide: false,
//         noBall: false,
//         byes: false,
//         legByes: false,
//         overthrow: false,
//       },
//       isLegal: true,
//     }));
//   };
