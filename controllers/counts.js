const { StatusCodes } = require('http-status-codes')
const { PrismaClient } = require('@prisma/client')
const { nanoid } = require('nanoid')

const prisma = new PrismaClient()

const subscription = async (req, res) => {
  const uid = nanoid()

  try {
    prisma.count.create({
      data: {
        uid: uid,
        count: 0
      }
    }).then(count => {
      if (count) {
        res.json({
          success: true,
          uid: uid
        })
      }
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

const getCount = async (req, res) => {
  const uid = req.params.uid

  try {
    prisma.count.findUnique({
      where: {
        uid: uid
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
      if (count) {
        res.json({
          success: true,
          count: count.count
        })
      }
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
