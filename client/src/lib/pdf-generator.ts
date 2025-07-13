import jsPDF from 'jspdf';
import type { GeneratedItinerary } from '../types/itinerary';

export function generateItineraryPDF(itinerary: GeneratedItinerary): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = margin;

  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(itinerary.title, margin, yPosition);
  yPosition += 15;

  // Trip details
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Destination: ${itinerary.destination}`, margin, yPosition);
  yPosition += 8;
  doc.text(`Duration: ${itinerary.duration}`, margin, yPosition);
  yPosition += 8;
  doc.text(`Travelers: ${itinerary.travelers}`, margin, yPosition);
  yPosition += 8;
  doc.text(`Budget: ${itinerary.budget}`, margin, yPosition);
  yPosition += 15;

  // Experience tags
  doc.setFont('helvetica', 'bold');
  doc.text('Experience Tags:', margin, yPosition);
  yPosition += 8;
  doc.setFont('helvetica', 'normal');
  doc.text(itinerary.experienceTags.join(', '), margin, yPosition);
  yPosition += 20;

  // Days
  itinerary.days.forEach((day) => {
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = margin;
    }

    // Day header
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`Day ${day.day} - ${day.title}`, margin, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Estimated budget: ${day.estimatedBudget}`, margin, yPosition);
    yPosition += 15;

    // Activities
    day.activities.forEach((activity) => {
      // Check if we need a new page
      if (yPosition > 240) {
        doc.addPage();
        yPosition = margin;
      }

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`${activity.time} - ${activity.title}`, margin, yPosition);
      yPosition += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      
      // Description
      const splitDescription = doc.splitTextToSize(activity.description, pageWidth - 2 * margin);
      doc.text(splitDescription, margin, yPosition);
      yPosition += splitDescription.length * 4;

      // Details
      doc.text(`Duration: ${activity.duration} | Transport: ${activity.transport} | Cost: ${activity.cost}`, margin, yPosition);
      yPosition += 6;

      // Tags
      doc.text(`Tags: ${activity.tags.join(', ')}`, margin, yPosition);
      yPosition += 12;
    });

    yPosition += 10;
  });

  // Save the PDF
  doc.save(`${itinerary.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_itinerary.pdf`);
}
