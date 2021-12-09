import { serverTimestamp } from 'firebase/firestore';
export class Analyse {
  name: string;
  delai: string;
  conditionPrelevement: string;
  serviceAnalyse: string;
  createdAt: number;
  updateAt: any;
  id: string;
  users: string[]; //contient les clés des company qui utilise l'analyse
  price: string;
  typeMedicament: string; //solid, liquide, sirop, gelule
  constructor(name, serviceAnalyse) {
    this.name = name;
    this.createdAt = new Date().getTime();
    this.updateAt = serverTimestamp();
    this.serviceAnalyse = serviceAnalyse;
    this.users = [];
    this.conditionPrelevement = 'typeMedicament';
    this.delai = '';
  }
}
