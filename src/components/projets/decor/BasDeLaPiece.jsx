import PileDeLivres from "./PileDeLivres";
import Lampe from "./Lampe";
import Chat from "./Chat";
import Sol from "./Sol";
import Bandeau from "./Bandeau";

// Le bas de la pièce, d'un bord à l'autre de l'écran : les objets posés au
// pied du mur, le chat qui passe, le sol en damier et le bandeau d'accueil.
export default function BasDeLaPiece({ texteBandeau }) {
  return (
    <div className="relative -mx-4 mt-12 md:-mx-12 md:mt-16">
      <div className="relative h-28 md:h-36">
        <PileDeLivres className="absolute bottom-0 left-[6%] w-28 md:left-[12%] md:w-44" />
        <Lampe className="absolute bottom-0 right-[6%] h-40 w-16 md:right-[8%] md:h-52 md:w-20" />
        <Chat />
      </div>
      <Sol />
      <Bandeau texte={texteBandeau} />
    </div>
  );
}
