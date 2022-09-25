import { Args, Query, Resolver } from '@nestjs/graphql'
import { RetailService } from '../retail_api/retail.service'
import { OrdersResponse } from '../graphql'

@Resolver('Orders')
export class OrdersResolver {
  constructor(private retailService: RetailService) { }

  @Query()
  async order(@Args('number') id: string) {
    return this.retailService.findOrder(id)
  }

  @Query()
  async getOrders(@Args('page') page: number) {
    const data = await this.retailService.orders({ page })
    const response: OrdersResponse = {
      orders: data[0],
      pagination: data[1]
    }
    return response
  }
}
