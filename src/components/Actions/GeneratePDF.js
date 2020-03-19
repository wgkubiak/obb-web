import React from "react";
import jsPDF from "jspdf";
import GenerateButton from "./../Buttons/GenerateButton";
import "jspdf-autotable";

const GeneratePDF = props => {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text(`${props.fileheader}`, 10, 20);
    doc.autoTable({
      startY: 25,
      head: [props.header],
      body: props.unlData.map(data => {
        if (props.mode === "global") {
          return [
            `${data.id}`,
            `${data.measureDate.substring(0, 10)}`,
            `${data.measureTime}`,
            `${data.nhThree}`,
            `${data.hTwoS}`,
            `${data.coTwo}`,
            `${data.temperature}`,
            `${data.wetness}`
          ];
        } else if (props.mode === "sold") {
          return [
            `${data.pigSaleDate.substring(0, 10)}`,
            `${data.pigSellingCost}`,
            `${data.pigShoppingDate.substring(0, 10)}`,
            `${data.pigShoppingPrice}`,
            `${data.id}`,
            `${data.pigGender === "m" ? "Samiec" : "Samica"}`,
            `${data.idPen}`
          ];
        } else {
          return [
            `${data.pigDeathDate.substring(0, 10)}`,
            `${data.idPen}`,
            `${data.id}`,
            `${data.pigGender === "m" ? "Samiec" : "Samica"}`,
            `${data.pigShoppingDate.substring(0, 10)}`,
            `${data.pigShoppingPrice}`
          ];
        }
      })
    });

    doc.save(`${props.filename}.pdf`);
  };

  return <GenerateButton generatePDF={generatePDF} />;
};

export default GeneratePDF;
