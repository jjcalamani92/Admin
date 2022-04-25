export interface IClient {
  _id: string;
  name: string;
  email: string;
  password: string;
  img: string;
  rol: string;
  status: boolean;
  
  siteData: SiteDataClass;

  createdAt: string;
  updatedAt: string;
}

export interface SiteDataClass {
  name: string;
  domain: string;
  dataBase: string;
  logo: string;
  phoneNumber: number;
  map?: string;
  pages:string[];
  homeSliders: Home[];
  homeBanners: Home[];

}

export interface Home {
  title: string;
  content: string;
  image: string;
}