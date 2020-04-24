import React from "react";
import jsPDF from "jspdf";
import GenerateButton from "../UI/Buttons/GenerateButton";
import "jspdf-autotable";

const GeneratePDF = (props) => {
  //TODO: Replace polish signs
  const generatePDF = () => {
    let doc;

    if (props.mode === "exams") {
      doc = new jsPDF("landscape");
    } else {
      doc = new jsPDF();
    }

    doc.text(`${props.fileheader}`, 10, 20);
    doc.autoTable({
      startY: 25,
      head: [props.header],
      columnStyles: {
        Rezultat: { cellWidth: 100 },
        Zmiany: { cellWidth: 80 },
        Awarie: { cellWidth: 40 },
      },
      body: props.unlData.map((data) => {
        if (props.mode === "global") {
          return [
            `${data.id}`,
            `${data.measureDate.substring(0, 10)}`,
            `${data.measureTime}`,
            `${data.nhThree}`,
            `${data.hTwoS}`,
            `${data.coTwo}`,
            `${data.temperature}`,
            `${data.wetness}`,
          ];
        } else if (props.mode === "sold") {
          return [
            `${data.pigSaleDate.substring(0, 10)}`,
            `${data.pigSellingCost}`,
            `${data.pigShoppingDate.substring(0, 10)}`,
            `${data.pigShoppingPrice}`,
            `${data.id}`,
            `${data.pigGender === "m" ? "Samiec" : "Samica"}`,
            `${data.idPen}`,
          ];
        } else if (props.mode === "pen-measures") {
          return [
            `${data.idPen}`,
            `${data.measureDate.substring(0, 10)}`,
            `${data.measureTime}`,
            `${data.breakdown}`,
            `${data.dosatron}`,
            `${data.addition}`,
            `${data.forage}`,
            `${data.forageQtyUsed}`,
          ];
        } else if (props.mode === "forage") {
          return [
            `${data.idPen}`,
            `${data.creationDate.substring(0, 10)}`,
            `${data.expiration.substring(0, 10)}`,
            `${data.producer}`,
            `${data.fgQty}`,
            `${data.fgPrice}`,
            `${data.fgAbout}`,
          ];
        } else if (props.mode === "exams") {
          return [
            `${data.id}`,
            `${data.exDate.substring(0, 10)}`,
            `${data.exTime}`,
            `${data.feces}`,
            `${data.tissue}`,
            `${data.exResult}`,
            `${data.medicine}`,
            `${data.medicineQty}`,
            `${data.medicineType}`,
            `${data.diarrhea}`,
            `${data.pigWeight}`,
            `${data.temperature}`,
            `${data.lameness}`,
            `${data.respiratorySys}`,
            `${data.skinChanges}`,
          ];
        } else {
          return [
            `${data.pigDeathDate.substring(0, 10)}`,
            `${data.idPen}`,
            `${data.id}`,
            `${data.pigGender === "m" ? "Samiec" : "Samica"}`,
            `${data.pigShoppingDate.substring(0, 10)}`,
            `${data.pigShoppingPrice}`,
          ];
        }
      }),
    });

    doc.save(`${props.filename}.pdf`);
  };

  return (
    <GenerateButton
      generatePDF={generatePDF}
      mode={props.mode}
      text={props.text}
    />
  );
};

export default GeneratePDF;
