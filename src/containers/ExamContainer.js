import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";

const ExamContainer = props => {

let longtext = "N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A";

const showPartOfString = (string, l) => {
    if(string.length <= l) {
        return string;
    }
        
    return string.substr(0, string.lastIndexOf(' ', l));
}

  useEffect(() => {
    console.log(props.unitID);
  });

  return (
    <div className="exam">
      <div className="exam--transparent"></div>
      <div className="exam--container">
        <button onClick={props.toggleExams}>SCHOWAJ</button>
        <h1>{props.unitID}</h1>
        <div className="exam--container--cards">
          <Card className="exam--container--cards-data exam--result-card-small">
            <Card.Body>
              <Card.Title>Odchody</Card.Title>
              <Card.Text>2020-03-19 | 12:00:00</Card.Text>
              <Card.Text>N/A</Card.Text>
            </Card.Body>
          </Card>
          <Card className="exam--container--cards-data exam--result-card-small">
            <Card.Body>
              <Card.Title>Tkanka</Card.Title>
              <Card.Text>2020-03-19</Card.Text>
              <Card.Text>N/A</Card.Text>
            </Card.Body>
          </Card>
          <Card className="exam--container--cards-data exam--result-card-small">
            <Card.Body>
              <Card.Title>Leki</Card.Title>
              <Card.Text>2020-03-19</Card.Text>
              <Card.Text>N/A</Card.Text>
            </Card.Body>
          </Card>
          <Card className="exam--container--cards-data exam--result-card-small">
            <Card.Body>
              <Card.Title>Ilość</Card.Title>
              <Card.Text>2020-03-19</Card.Text>
              <Card.Text>N/A</Card.Text>
            </Card.Body>
          </Card>
          <Card className="exam--container--cards-data exam--result-card-small">
            <Card.Body>
              <Card.Title>Rodzaj leków</Card.Title>
              <Card.Text>2020-03-19</Card.Text>
              <Card.Text>N/A</Card.Text>
            </Card.Body>
          </Card>
          <Card className="exam--container--cards-data exam--result-card-small">
            <Card.Body>
              <Card.Title>Rozwolnienie</Card.Title>
              <Card.Text>2020-03-19</Card.Text>
              <Card.Text>N/A</Card.Text>
            </Card.Body>
          </Card>

          <Card className="exam--container--cards-data exam--result-card-small">
            <Card.Body>
              <Card.Title>Waga</Card.Title>
              <Card.Text>2020-03-19</Card.Text>
              <Card.Text>N/A</Card.Text>
            </Card.Body>
          </Card>

          <Card className="exam--container--cards-data exam--result-card-small">
            <Card.Body>
              <Card.Title>Temperatura</Card.Title>
              <Card.Text>2020-03-19</Card.Text>
              <Card.Text>N/A</Card.Text>
            </Card.Body>
          </Card>

          <Card className="exam--container--cards-data exam--result-card-small">
            <Card.Body>
              <Card.Title>Kulawizna</Card.Title>
              <Card.Text>2020-03-19</Card.Text>
              <Card.Text>N/A</Card.Text>
            </Card.Body>
          </Card>

          <Card className="exam--container--cards-data exam--result-card-small">
            <Card.Body>
              <Card.Title>Układ oddechowy</Card.Title>
              <Card.Text>2020-03-19</Card.Text>
              <Card.Text>N/A</Card.Text>
            </Card.Body>
          </Card>
          <Card className="exam--container--cards-data exam--result-card-small">
            <Card.Body>
              <Card.Title>Zmiany naskórne</Card.Title>
              <Card.Text>2020-03-19</Card.Text>
              <Card.Text>N/A</Card.Text>
            </Card.Body>
          </Card>
          <Card className="exam--container--cards-data exam--result-card-wide">
            <Card.Body>
              <Card.Title>Wynik egzaminu</Card.Title>
              <Card.Text>2020-03-19</Card.Text>
              <Card.Text>
                {showPartOfString(longtext, 50)} ...
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExamContainer;
