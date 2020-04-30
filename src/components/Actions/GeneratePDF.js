import React, {useState, useEffect} from "react";
import jsPDF from "jspdf";
import GenerateButton from "../UI/Buttons/GenerateButton";
import "jspdf-autotable";

const GeneratePDF = (props) => {
  const [data, setData] = useState([]);
  const [sorted, setSorted] = useState(false);

  const sort = d => {
    const _data = [];
    const _arr = [];

    Object.keys(d).forEach((key) => {
      _data.push(d[key]);
    })

    _data.forEach((elem) => {
      _arr.push(Object.values(elem));
    })

    setData(_arr);
    setSorted(true);
  }


  useEffect(() => {
    sort(props.unlData);
  }, [sorted]);

  const generatePDF = (event) => {
    event.preventDefault();
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
      body: data
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
