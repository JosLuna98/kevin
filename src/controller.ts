import { DbCustomers, ICustomer } from './model'

export const create = async (req: any, res: any) => {
  const { card, name, money } = req.body

  if (!card) {
    res.status(400).send({ message: "Falta el identificador" })
    return
  }

  try {
    const exist: ICustomer | null = await DbCustomers.findOne({ card })
    if(exist) {
      res.status(400).send({ message: "El usuario ya existe" })
      return
    }
    await DbCustomers.create({ card, name, money })
    res.statues(200).send({ message: "Registrado correctamente!" })
  } catch (e) {
    res.status(400).send({ message: "Error al registrar" })
    return
  }
}

export const pay = async (req: any, res: any) => {
  const { card, cost, location } = req.body

  if (!card) {
    res.status(400).send({ message: "Falta el identificador" })
    return
  }

  try {
    const customer: ICustomer | null = await DbCustomers.findOne({ card })
    if(!customer) {
      res.status(400).send({ message: "El usuario no existe" })
      return
    }

    if(cost > customer.money) {
      res.status(400).send({ message: "Dinero insuficiente" })
      return
    }
    const new_money = customer.money - cost
    const last_location = {
      type: 'Point',
      coordinates: [location[0], location[1]]
    }

    await customer.updateOne({ money: new_money, last_location })
    res.statues(200).send({ message: "Disfrute el viaje!" })
  } catch (e) {
    res.status(400).send({ message: "Error al procesar" })
    return
  }
}

export const reload = async (req: any, res: any) => {
  const { card, load } = req.body

  if (!card) {
    res.status(400).send({ message: "Falta el identificador" })
    return
  }

  try {
    const customer: ICustomer | null = await DbCustomers.findOne({ card })
    if(!customer) {
      res.status(400).send({ message: "El usuario no existe" })
      return
    }

    const new_money = customer.money + load

    await customer.updateOne({ money: new_money })
    res.statues(200).send({ message: "Recarga exitosa!" })
  } catch (e) {
    res.status(400).send({ message: "Error al procesar" })
    return
  }
}