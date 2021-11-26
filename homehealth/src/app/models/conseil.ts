import firebase from 'firebase/compat/app';
export class Conseil {
  id: string;
  date: Date;
  utilisateur: firebase.User;
  cover: string; // image de base
  images: Array<string>;
  video: string;
  le_type: string;
  texte: string;
  likes?: number;
  likeurs = new Array<string>();
  commentaires = new Array<string>();
  titre: string;
  constructor(texte: string) {
    this.date = new Date();
    this.id = this.generateUID();
    this.texte = texte;
    this.likes = 0;
  }

  generateUID() {
    const date = new Date();
    const dateString = date.toISOString().split('T')[0];
    return dateString + Math.ceil(Math.random() * 1000000);
  }
}
