export class PlaceLocation{
  constructor(
    public id: string = "",
    public address: string = "",
    public city: string = "",
    public latitude: number|null = 0,
    public longitude: number|null = 0){}
}
