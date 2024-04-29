const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const audio = new Audio('audio.mp3')
const score = document.querySelector('.score--value')
const finalscore = document.querySelector('.final-score > span')
const menu = document.querySelector('.menu-screen')
const buttonplay = document.querySelector('.btn-play')
const size = 30



let snake = [
    {x: 330, y: 240},
   
]

const incrementscore = () => {
    score.innerText = parseInt(score.innerText) + 10
}
const randomnumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomposition = () => {
    const number = randomnumber(0, 570)
    return Math.round(number / 30) * 30
}

const food = {
    x: randomposition(0, 570),
    y: randomposition(0, 570),
    color: "red"
}
let direction , loopid
const drawfood = () => {
    const {x, y, color} = food

    
   
    ctx.fillStyle = color
    ctx.fillRect(food.x, food.y, size, size)
    
    
}

const drawsnake = () => {
    ctx.fillStyle = '#8844DD'

   snake.forEach((elemento, index) => {

    if(index == snake.length - 1) {
        ctx.fillStyle = 'white'

    }
    ctx.fillRect(elemento.x, elemento.y, size, size)
   })
}

const movesnake = () => {
    if(!direction) return

    const head = snake[snake.length - 1]

    if (direction == 'right') {
        snake.push({x: head.x + size, y: head.y})
    }

    if (direction == 'left') {
        snake.push({x: head.x - size, y: head.y})
    }

    if (direction == 'down') {
        snake.push({x: head.x, y: head.y + size})
    }

    if (direction == 'up') {
        snake.push({x: head.x, y: head.y - size})
    }


    snake.shift()
}

const drawgrid = () => {
    ctx.lineWidth = 2
    ctx.strokeStyle = '#1C1C1C'

    for(let i = 30;i < canvas.width; i += 30) {
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    }
    }

   

const checkeat = () => {
    const head = snake[snake.length - 1]

    if(head.x == food.x && head.y == food.y) {
        snake.push(head)
        audio.play()
        incrementscore()

       let x = randomposition()
       let y = randomposition() 

       while (snake.find((position) => position.x == x && position.y == y)) {
         x = randomposition()
         y = randomposition() 
       }

       food.x = x 
       food.y = y
       food.color ="red"
    }
}

const checkcolision = () => {
    const head = snake[snake.length - 1]
    const canvaslimit = canvas.width - size
    const neckindex = snake.length - 2

    const wallcollision = head.x < 0 || head.x > canvaslimit || head.y < 0 || head.y > canvaslimit

    const selfcollision = snake.find((position, index) => {
        return index < neckindex && position.x == head.x && position.y == head.y
    })

   
    if(wallcollision || selfcollision) {
        gameover()
    }
}

const gameover = () => {
    direction = undefined
    menu.style.display = 'flex'
    finalscore.innerText = score.innerText
    canvas.style.filter = 'blur(2px)'
}
const gameloop = (() => {
    clearInterval(loopid)
    ctx.clearRect(0,0,600,600)
    drawgrid()
    drawfood()
    movesnake()
    drawsnake()
    checkeat()
    checkcolision()

    loopid =  setTimeout(() => {
        gameloop()
    }, 100);
})

gameloop()

document.addEventListener('keydown', ({key}) => {
    if(key == 'ArrowRight' && direction != 'left') {
        direction = 'right'
    }

    if(key == 'ArrowLeft'  && direction != 'right') {
        direction = 'left'
    }
 
    if(key == 'ArrowDown'  && direction != 'up') {
        direction = 'down'
    }

    if(key == 'ArrowUp'  && direction != 'down') {
        direction = 'up'
    }

})

buttonplay.addEventListener('click', () => {
    score.innerText = '00'
    menu.style.display = 'none'
    canvas.style.filter = 'none'
    snake = [{x: 330, y: 240}]
})
