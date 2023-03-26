import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import {
  IHotel,
  IHotelRooms,
  IRegisterForm,
  ISearchQuery,
  IUpdateRoom,
  ILoginForm,
  IUserData,
} from '../models'

type CustomErrorType = {
  data: { message: string; stack: string }
}

export const bookingApi = createApi({
  reducerPath: 'booking/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4444/api/',
  }),
  endpoints: build => ({
    getHotels: build.query<IHotel[], ISearchQuery>({
      query: (query: ISearchQuery) => ({
        url: `/hotels?city=${query.destination}&min=${query.min || 0}&max=${
          query.max || 99999
        }`,
      }),
    }),
    getFeaturedHotels: build.query<IHotel[], object>({
      query: () => '/hotels?featured=true&limit=4',
    }),

    getHotelInfo: build.query<IHotel, string>({
      query: (id: string) => `/hotels/find/${id}`,
    }),
    getRoomInfo: build.query<IHotelRooms[], string>({
      query: (id: string) => `/hotels/room/${id}`,
    }),

    countByCity: build.query({
      query: () => '/hotels/countByCity?cities=rome,paris,london,prague',
    }),
    countByType: build.query({
      query: () => '/hotels/countByType',
    }),

    updateRoom: build.mutation<string, IUpdateRoom>({
      query: (room: IUpdateRoom) => ({
        url: `/rooms/availability/${room.roomId}`,
        method: 'PUT',
        body: { dates: room.dates },
      }),
    }),
  }),
})

export const authApi = createApi({
  reducerPath: 'auth/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4444/api/auth/',
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomErrorType, {}>,
  endpoints: build => ({
    registerUser: build.mutation<IUserData, IRegisterForm>({
      query: (userData: IRegisterForm) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),
    loginUser: build.mutation<IUserData, ILoginForm>({
      query: (userData: ILoginForm) => ({
        url: '/login',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
})

export const {
  useGetHotelsQuery,
  useGetFeaturedHotelsQuery,
  useGetRoomInfoQuery,
  useGetHotelInfoQuery,
  useCountByCityQuery,
  useCountByTypeQuery,
  useUpdateRoomMutation,
} = bookingApi

export const { useLoginUserMutation, useRegisterUserMutation } = authApi
