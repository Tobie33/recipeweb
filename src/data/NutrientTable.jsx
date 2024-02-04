// export const NutrientTable = () => {
//   return (

//   {
//     servingColumns : [
//       {
//         name:'Nutrient',
//         selector: row => row.name,
//         sortable: true
//       },
//       {
//         name:'Per Serving',
//         selector: row => row.serving,
//         sortable: true
//       }
//     ],

//     servingData : [
//       Object.values(caloricBreakdown).map((nutrient,index) => {
//         const nutritionList = [
//           'Carbohydrates', 'Fat', 'Protein'
//         ]
//         return(
//           {
//             name: nutritionList[index],
//             serving: nutrient
//           }
//         )
//       })
//     ],

//     nutrientsColumns : [
//       {
//         name:'Nutrients',
//         selector: row => row.name,
//         sortable:true
//       },
//       {
//         name: 'Amount',
//         selector: row => row.amount,
//       },
//       {
//         name: 'Daily Amount Needed',
//         selector: row => row.dailyNeeds,
//         sortable:true
//       }
//     ],

//     nutrientsData : [
//       nutrients.map(nutrient => (
//         {
//           name: nutrient.name,
//           amount: nutrient.amount + nutrient.unit,
//           dailyNeeds: nutrient.percentOfDailyNeeds
//         }
//       ))
//     ]
//   }
//   )
// }
