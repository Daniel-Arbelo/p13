/**
 * Enum para el tipo de funko pop
 */
export enum FunkoType {
    POP = "Pop!",
    POP_RIDES = "Pop! Rides",
    VINYL_SODA = "Vinyl Soda",
    VINYL_GOLD = "Vinyl Gold",
}
  
/**
 * Enum para el genero del funkopop
 */
export enum FunkoGenre {
    ANIMATION = "Animation",
    MOVIES_AND_TV = "Movies and TV",
    VIDEOGAMES = "Video Games",
    SPORTS = "Sports",
    MUSIC = "Music",
    ANIME = "Anime",
}
  
/**
 * Clase para representar a los funkopop
 */
export class FunkoPop {
    private _myid: string
    private _name: string;
    private _description: string;
    private _type: FunkoType;
    private _genre: FunkoGenre;
    private _franchise: string;
    private _number: number;
    private _exclusive: boolean;
    private _specialFeatures: string;
    private _marketValue: number;
  
    /**
     * Constructor de la clase FunkoPop
     * @param id id único del funko
     * @param name nombre del funko
     * @param description descripción del funko
     * @param type tipo de funkopop
     * @param genre genero del funkopop
     * @param franchise franquicia a la que pertenece el funkopop
     * @param number numero identificativo dentro de la franquicia
     * @param exclusive valor booleano siendo verdadero si es exclusivo y falso si no
     * @param specialFeatures características especiales, como si brilla en la oscuridad o si su cabeza se balancea
     * @param marketValue precio del funko en el mercado
     */
    constructor(id: string, name: string, description: string, type: FunkoType, genre: FunkoGenre, franchise: string, number: number, exclusive: boolean, specialFeatures: string, marketValue: number) {
        this._myid = id;
        this._name = name;
        this._description = description;
        this._type = type;
        this._genre = genre;
        this._franchise = franchise;
        this._number = number;
        this._exclusive = exclusive;
        this._specialFeatures = specialFeatures;
        this._marketValue = marketValue;
    }
  
    /**
     * getter del id
     */
    get id(): string {
        return this._myid;
    }
  
    /**
     * setter del id
     */
    cambiarid(value: string) {
        this._myid = value;
    }
  
    /**
     * getter del nombre
     */
    get name(): string {
        return this._name;
    }

    /**
     * setter del nombre
     */
    cambiarname(value: string) {
        this._name = value;
    }
  
    /**
     * getter de la descripción
     */
    get description(): string {
        return this._description;
    }
  
    /**
     * setter de la descripción
     */
    cambiardescription(value: string) {
        this._description = value;
    }
  
    /**
     * getter del tipo
     */
    get type(): FunkoType {
        return this._type;
    }
    /**
     * setter del tipo
     */
    cambiartype(value: FunkoType) {
        this._type = value;
    }
  
    /**
     * getter del género
     */
    get genre(): FunkoGenre {
        return this._genre;
    }
  
    /**
     * setter del género
     */
    cambiargenre(value: FunkoGenre) {
        this._genre = value;
    }
  
    /**
     * getter de la franquicia a la que pertenece
     */
    get franchise(): string {
        return this._franchise;
    }
  
    /**
     * setter de la franquicia a la que pertenece
     */
    cambiarfranchise(value: string) {
        this._franchise = value;
    }
  
    /**
     * getter del numero identificativo dentro del la franquicia
     */
    get number(): number {
        return this._number;
    }
  
    /**
     * setter del numero identificativo dentro del la franquicia
     */
    cambiarnumber(value: number) {
        this._number = value;
    }
  
    /**
     * getter del booleano que dice si el funko es exclusivo
     */
    get exclusive(): boolean {
        return this._exclusive;
    }
  
    /**
     * setter del booleano que dice si el funko es exclusivo
     */
    cambiarexclusive(value: boolean) {
        this._exclusive = value;
    }
  
    /**
     * getter de las características especiales
     */
    get specialFeatures(): string {
        return this._specialFeatures;
    }
  
    /**
     * setter de las características especiales
     */
    cambiarspecialFeatures(value: string) {
        this._specialFeatures = value;
    }
  
    /**
     * getter del valor en mercado
     */
    get marketValue(): number {
        return this._marketValue;
    }
  
    /**
     * setter del valor en mercado
     */
    cambiarmarketValue(value: number) {
        this._marketValue = value;
    }
}