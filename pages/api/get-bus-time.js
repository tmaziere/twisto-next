import axios from "axios";
import qs from "qs";

export default async function handler(req, res) {
  const url =
    "https://data.twisto.fr/api/v2/catalog/datasets/horaires-tr/records?dataset=horaires-tr&rows=5&where=nom_de_l_arret_stop_name%3D'" +
    encodeURI(req.query.arret) +
    "'%20AND%20destination_stop_headsign%3D'" +
    encodeURI(req.query.direction) +
    "'&select=ligne,horaire_de_depart_reel&order_by=horaire_de_depart_reel%20ASC";

  await axios
    .get(url)
    .then(({ data }) => {
      res.status(200).json({ data});
    })
    .catch(({ err }) => {
      res.status(400).json({ err });
    });
}
