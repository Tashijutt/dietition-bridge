
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// This handles TypeScript errors with jsPDF-autotable plugin
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface Meal {
  type: string;
  name: string;
  ingredients: string[];
  instructions?: string;
  nutritionalInfo?: NutritionalInfo;
}

interface DayPlan {
  day: string;
  meals: Meal[];
}

interface DietPlan {
  id: string;
  title: string;
  description: string;
  type: "weight-loss" | "diabetes" | "heart-health" | "general";
  createdDate: string;
  source: "ai" | "dietitian";
  dietitianName?: string;
  mealPlan?: DayPlan[];
}

export const generatePDF = (dietPlan: DietPlan) => {
  const doc = new jsPDF();
  
  // Set title and add basic plan info
  const title = dietPlan.title;
  doc.setFontSize(20);
  doc.setTextColor(33, 32, 95); // Primary color #21205F
  doc.text(title, 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Type: ${dietPlan.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`, 20, 30);
  doc.text(`Created: ${new Date(dietPlan.createdDate).toLocaleDateString()}`, 20, 38);
  doc.text(`Source: ${dietPlan.source === 'ai' ? 'AI Generated' : 'Dietitian Provided'}`, 20, 46);
  
  if (dietPlan.dietitianName) {
    doc.text(`Dietitian: ${dietPlan.dietitianName}`, 20, 54);
  }
  
  // Add description
  doc.setFontSize(11);
  doc.text('Description:', 20, 62);
  const descriptionLines = doc.splitTextToSize(dietPlan.description, 170);
  doc.text(descriptionLines, 20, 70);
  
  let yPosition = 70 + (descriptionLines.length * 7);
  
  // Add meal plan
  if (dietPlan.mealPlan && dietPlan.mealPlan.length > 0) {
    dietPlan.mealPlan.forEach((day, index) => {
      // Add some spacing
      yPosition += 15;
      
      // Check if need to add new page
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Day header
      doc.setFontSize(14);
      doc.setTextColor(33, 32, 95); // Primary color #21205F
      doc.text(day.day, 20, yPosition);
      yPosition += 10;
      
      // Reset text color
      doc.setTextColor(0, 0, 0);
      
      // Loop through meals
      day.meals.forEach(meal => {
        // Check if need to add new page
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }
        
        // Meal type and name
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text(`${meal.type}: ${meal.name}`, 20, yPosition);
        yPosition += 8;
        
        // Ingredients
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        doc.text('Ingredients:', 20, yPosition);
        yPosition += 6;
        
        meal.ingredients.forEach(ingredient => {
          doc.text(`• ${ingredient}`, 25, yPosition);
          yPosition += 6;
        });
        
        // Instructions if available
        if (meal.instructions) {
          yPosition += 2;
          doc.text('Instructions:', 20, yPosition);
          yPosition += 6;
          const instructionsLines = doc.splitTextToSize(meal.instructions, 165);
          doc.text(instructionsLines, 25, yPosition);
          yPosition += (instructionsLines.length * 6) + 2;
        }
        
        // Nutritional info if available
        if (meal.nutritionalInfo) {
          yPosition += 2;
          
          // Check if need to add new page
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }
          
          doc.text('Nutritional Information:', 20, yPosition);
          yPosition += 6;
          
          const nutritionalInfo = [
            [`Calories: ${meal.nutritionalInfo.calories} kcal`],
            [`Protein: ${meal.nutritionalInfo.protein}g`],
            [`Carbs: ${meal.nutritionalInfo.carbs}g`],
            [`Fats: ${meal.nutritionalInfo.fats}g`]
          ];
          
          doc.autoTable({
            startY: yPosition,
            margin: { left: 25 },
            tableWidth: 100,
            body: nutritionalInfo,
            theme: 'plain',
            styles: { fontSize: 10, cellPadding: 2 },
            columnStyles: { 0: { cellWidth: 100 } }
          });
          
          yPosition = (doc as any).lastAutoTable.finalY + 8;
        } else {
          yPosition += 8;
        }
      });
    });
  } else {
    yPosition += 10;
    doc.text('Detailed meal plan not available for this diet plan.', 20, yPosition);
  }
  
  // Add footer with branding colors
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(33, 32, 95); // Primary color #21205F
    doc.text(`Generated by Dietitian Bridge - Page ${i} of ${totalPages}`, 105, 290, { align: 'center' });
  }
  
  try {
    // Save the PDF
    const fileName = `${dietPlan.title.replace(/\s+/g, '_')}_Diet_Plan.pdf`;
    doc.save(fileName);
  } catch (error) {
    console.error("Error saving PDF:", error);
    // Fallback using blob and FileSaver
    try {
      const blob = doc.output('blob');
      const fileName = `${dietPlan.title.replace(/\s+/g, '_')}_Diet_Plan.pdf`;
      saveAs(blob, fileName);
    } catch (fallbackError) {
      console.error("Error with fallback PDF save:", fallbackError);
      throw new Error("Could not generate PDF");
    }
  }
};
