export interface IHotel {
  _id: string
  name: string
  type: string
  city: string
  address: string
  distance: string
  photos: string[]
  title: string
  desc: string
  rooms: string[]
  cheapestPrice: number
  featured: boolean
  __v: number
}

export interface IHotelRooms {
  _id: string
  title: string
  price: number
  maxPeople: number
  desc: string
  roomNumbers: IRoomNumber[]
  createdAt: Date
  updatedAt: Date
  __v: number
}

export interface IRoomNumber {
  number: number
  unavailableDates: number[]
  _id: string
}

export interface IUpdateRoom {
  roomId: string
  dates: number[]
}

export interface IOptions {
  adult: number
  children: number
  room: number
}

export interface ISearchQuery {
  destination: string
  min: string
  max: string
}

export interface IRangeWithKey {
  startDate: Date
  endDate: Date
  key: string
}

export interface ISearchState {
  destination: string
  dates: IRangeWithKey[]
  options: {
    adult: number
    children: number
    room: number
  }
}

export interface ILoginForm {
  username: string
  password: string
}

export interface IRegisterForm {
  username: string
  email: string
  password: string
  phone: string
  country: string
  city: string
}

export interface IUserData {
  _id: string
  username: string
  email: string
  phone: string
  country: string
  city: string
  isAdmin: boolean
  createdAt: Date
  updatedAt: Date
  __v: number
  token: string
}

export interface IAuthState {
  name: string | null
  token: string | null
}

export interface IReserveSnackBar {
  reserveReport: true
}
