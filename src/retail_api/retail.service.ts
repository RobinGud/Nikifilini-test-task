import { Injectable } from '@nestjs/common'
import { CrmType, Order, OrdersFilter, RetailPagination, } from './types'
import axios, { AxiosInstance } from 'axios'
import { ConcurrencyManager } from 'axios-concurrency'
import { serialize } from '../tools'
import { plainToClass } from 'class-transformer'

@Injectable()
export class RetailService {
  private readonly axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: `${process.env.RETAIL_URL}/api/v5`,
      timeout: 10000,
      headers: {},
      params: {
        apiKey: "oNbsUBBad2rQtcDDW28K4mT8aE5A7GlV"
      }
    })

    this.axios.interceptors.request.use((config) => {
      // console.log(config.url)
      return config
    })
    this.axios.interceptors.response.use(
      (r) => {
        // console.log("Result:", r.data)
        return r
      },
      (r) => {
        // console.log("Error:", r.response.data)
        return r
      },
    )
  }

  async orders(filter?: OrdersFilter): Promise<[Order[], RetailPagination]> {
    const params = serialize(filter, '')
    const resp = await this.axios.get('/orders?' + params)

    if (!resp.data) throw new Error('RETAIL CRM ERROR')

    const orders = plainToClass(Order, resp.data.orders as Array<any>)
    const pagination: RetailPagination = resp.data.pagination
    // console.log(orders[1])
    return [orders, pagination]
  }

  async findOrder(id: string): Promise<Order | null> {
    const params = serialize({ filter: { ids: [id] } }, '')
    const resp = await this.axios.get('/orders?' + params)

    if (!resp.data) throw new Error('RETAIL CRM ERROR')

    const order = plainToClass(Order, resp.data.orders as Array<any>)
    // console.log(order)
    return null
  }

  async orderStatuses(): Promise<CrmType[]> {
    const resp = await this.axios.get('/orders/statuses')

    if (!resp.data) throw new Error('RETAIL CRM ERROR')

    console.log(resp.data)
    const orderStatuses = plainToClass(CrmType, resp.data.orders as Array<any>)
    return []
  }

  async productStatuses(): Promise<CrmType[]> {
    const resp = await this.axios.get('/reference/product-statuses')

    if (!resp.data) throw new Error('RETAIL CRM ERROR')

    console.log(resp.data)
    const productStatuses = plainToClass(CrmType, resp.data.orders as Array<any>)
    return []
  }

  async deliveryTypes(): Promise<CrmType[]> {
    const resp = await this.axios.get('/reference/delivery-types')

    if (!resp.data) throw new Error('RETAIL CRM ERROR')

    console.log(resp.data)
    const productStatuses = plainToClass(CrmType, resp.data.orders as Array<any>)
    return []
  }
}
