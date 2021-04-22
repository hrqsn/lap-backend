const { StatusCodes } = require('http-status-codes')
const { PrismaClient } = require('@prisma/client')
const { nanoid } = require('nanoid')

const prisma = new PrismaClient()

const subscription = async (req, res) => {
  const uid = nanoid()

  try {
    const count = await prisma.count.create({
      data: {
        uid: uid,
        count: 0
      }
    }).catch(error => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end(error.message)
    })
    res.json({
      success: true,
      uid: uid
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message
    })
  }
}

const getCount = async (req, res) => {
  const uid = req.params.uid

  try {
    const count = await prisma.count.findUnique({
      where: {
        uid: uid
      }
    }).catch(error => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end(error.message)
    })
    res.json({
      success: true,
      count: count.count
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message
    })
  }
}

const updateCount = async (req, res) => {
  const uid = req.params.uid

  try {
    prisma.count.update({
      where: {
        uid: uid
      },
      data: {
        count: {
          increment: Number(req.body.count)
        }
      }
    }).then(count => {
      res.json({
        success: true,
        count: count.count
      })
    }).catch(error => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end(error.message)
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = {
  subscription,
  getCount,
  updateCount
}
