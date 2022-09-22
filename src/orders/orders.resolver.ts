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
    console.log(page)
    const dummyData: OrdersResponse = {
      orders: [{
        number: 'String!',
        id: 1,
        site: 'String',
        createdAt: 'String',
        status: 'String',
        items: [{
          id: 12,
          status: 'String',
          quantity: 1,
          comment: 'String'
        }]
      }],
      pagination: {
        limit: 12,
        totalCount: 12,
        currentPage: 12,
        totalPageCount: 12,
      }
    }
    const orders = await this.retailService.orders({ page })
    return dummyData
  }
}
