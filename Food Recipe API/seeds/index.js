const fs = require('fs');
const csvParser=require('csv-parser');
const Recipe=require('../models/recipe');

fs.createReadStream('./IndianFoodDatasetCSV.csv')
    .pipe(csvParser())
    .on('data', async (row) => {
        const recipe = new Recipe({
            index: row.Srno,
            name: row.RecipeName,
            ingredients: row.Ingredients,
            transIngredient: row.TranslatedIngredients,
            prepTime: row.PrepTimeInMins,
            cookTime: row.CookTimeInMins,
            totalTime: row.TotalTimeInMins,
            Servings: row.Servings,
            cuisine: row.Cuisine,
            course: row.Course,
            diet: row.Diet,
            instructions: row.Instructions,
            transInst: row.TranslatedInstructions,
            webURL: row.URL,
        });

        try {
            await recipe.save();
            console.log(`Recipe saved: ${recipe.name}`);
        } catch (err) {
            console.error(`Error saving recipe: ${err.message}`);
        }
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
        mongoose.connection.close();
    });