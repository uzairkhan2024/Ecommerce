export class CheckOutDto {
    message!: string
    result!: boolean
    data!: CheckOut[]
  }

export class CheckOut {
    SaleId!: number
    CustId!: number
    SaleDate!: string
    TotalInvoiceAmount!: number
    Discount!: number
    PaymentNaration!: string
    DeliveryAddress1!: string
    DeliveryAddress2!: string
    DeliveryCity!: string
    DeliveryPinCode!: string
    DeliveryLandMark!: string
  }
  