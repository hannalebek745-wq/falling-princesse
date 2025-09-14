enum ActionKind {
    Walking,
    Idle,
    Jumping
}
namespace SpriteKind {
    export const Gap = SpriteKind.create()
}
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vy = -100
    animation.setAction(mySprite, ActionKind.Jumping)
    mySprite.startEffect(effects.rings, 300)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gap, function (sprite, otherSprite) {
    if (otherSprite.right - sprite.left < 2) {
        info.changeScoreBy(1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    game.setGameOverPlayable(false, music.melodyPlayable(music.spooky), false)
    game.over(false)
})
let projectile: Sprite = null
let gapSprite: Sprite = null
let gapImage: Image = null
let bottomImage: Image = null
let topImage: Image = null
let gap = 0
let mySprite: Sprite = null
scene.setBackgroundColor(9)
info.setScore(0)
effects.blizzard.startScreenEffect()
mySprite = sprites.create(img`
    4 . . . . . . . . . . . . . . . 
    4 4 . . . . . . . . . . . . . . 
    4 4 . . . . f . f . . . . . . . 
    5 5 4 4 . f 6 f 6 f . . . . . . 
    5 5 5 4 . f 6 f f f f f f . . . 
    4 5 f 4 . f 6 6 6 6 1 6 6 f . . 
    4 f d f f f f f 6 6 6 1 6 6 f . 
    4 f f d d f 3 f 6 6 6 6 1 5 5 5 
    4 3 3 f f 3 5 d d 6 6 6 6 5 5 . 
    4 3 5 3 3 3 f d d d d 6 6 2 5 5 
    4 f 3 f 3 5 f d 3 f f 6 6 6 f . 
    4 f f . f f . f d d d 6 6 f . . 
    . . . . . . . . f f f f f . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
mySprite.ay = 300
let anim = animation.createAnimation(ActionKind.Jumping, 25)
anim.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    4 . . . . . . . 5 . 5 . . . . . 
    4 4 . . . . . f 5 5 5 f . . . . 
    5 5 4 4 . . f 6 5 5 2 6 f . . . 
    5 5 5 4 . f 6 6 1 6 6 6 6 f . . 
    4 5 f 4 . f 6 1 6 6 6 6 6 f . . 
    4 f d f f f 1 6 6 6 d f d f . . 
    4 f f d f f 6 6 3 6 d f d f . . 
    4 3 3 f 6 f 6 6 6 d d 3 d f . . 
    4 3 5 3 f f 6 f f d d d f . . . 
    4 f 3 f 6 6 6 f 3 5 f f . . . . 
    4 f f . f f f f f 3 3 5 f . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `)
anim.addAnimationFrame(img`
    4 . . . . . . 5 . 5 . . . . . . 
    4 4 . . . . f 5 5 5 f . . . . . 
    4 4 . . . f 6 5 5 2 6 f . . . . 
    5 5 4 4 f 6 6 1 6 6 6 6 f . . . 
    5 5 5 4 f 6 1 6 6 6 6 6 f . . . 
    4 5 f 4 f 1 6 6 6 d f d f . . . 
    4 f d f f 6 6 6 6 d f d f . . . 
    4 f f 6 f 6 6 6 d d 3 d f . . . 
    4 3 3 f f 6 f f d d d f . . . . 
    4 3 f 6 6 6 f 3 5 f f . . . . . 
    4 f 3 f f f f f 3 3 5 f . . . . 
    4 f f . . . f d f 3 3 f . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `)
anim.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    4 . . . . . . . 5 . 5 . . . . . 
    4 4 . . . . . f 5 5 5 f . . . . 
    5 5 4 4 . . f 6 5 5 2 6 f . . . 
    5 5 5 4 . f 6 6 1 6 6 6 6 f . . 
    4 5 f 4 . f 6 1 6 6 6 6 6 f . . 
    4 f d f f f 1 6 6 6 d f d f . . 
    4 f f d f f 6 6 3 6 d f d f . . 
    4 3 3 f 6 f 6 6 6 d d 3 d f . . 
    4 3 5 3 f f 6 f f d d d f . . . 
    4 f 3 f 6 6 6 f 3 5 f f . . . . 
    4 f f . f f f f f 3 3 5 f . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `)
anim.addAnimationFrame(img`
    4 . . . . . . 5 . 5 . . . . . . 
    4 4 . . . . f 5 5 5 f . . . . . 
    4 4 . . . f 6 5 5 2 6 f . . . . 
    5 5 4 4 f 6 6 1 6 6 6 6 f . . . 
    5 5 5 4 f 6 1 6 6 6 6 6 f . . . 
    4 5 f 4 f 1 6 6 6 d f d f . . . 
    4 f d f f 6 6 6 6 d f d f . . . 
    4 f f 6 f 6 6 6 d d 3 d f . . . 
    4 3 3 f f 6 f f d d d f . . . . 
    4 3 f 6 6 6 f 3 5 f f . . . . . 
    4 f 3 f f f f f 3 3 5 f . . . . 
    4 f f . . . f d f 3 3 f . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `)
anim.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    4 . . . . . . . 5 . 5 . . . . . 
    4 4 . . . . . f 5 5 5 f . . . . 
    5 5 4 4 . . f 6 5 5 2 6 f . . . 
    5 5 5 4 . f 6 6 1 6 6 6 6 f . . 
    4 5 f 4 . f 6 1 6 6 6 6 6 f . . 
    4 f d f f f 1 6 6 6 d f d f . . 
    4 f f d f f 6 6 3 6 d f d f . . 
    4 3 3 f 6 f 6 6 6 d d 3 d f . . 
    4 3 5 3 f f 6 f f d d d f . . . 
    4 f 3 f 6 6 6 f 3 5 f f . . . . 
    4 f f . f f f f f 3 3 5 f . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `)
anim.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    4 . . . . . . . 5 . 5 . . . . . 
    4 4 . . . . . f 5 5 5 f . . . . 
    5 5 4 4 . . f 6 5 5 2 6 f . . . 
    5 5 5 4 . f 6 6 1 6 6 6 6 f . . 
    4 5 f 4 . f 6 1 6 6 6 6 6 f . . 
    4 f d f f f 1 6 6 6 d f d f . . 
    4 f f d f f 6 6 3 6 d f d f . . 
    4 3 3 f 6 f 6 6 6 d d 3 d f . . 
    4 3 5 3 f f 6 f f d d d f . . . 
    4 f 3 f 6 6 6 f 3 5 f f . . . . 
    4 f f . f f f f f 3 3 5 f . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `)
animation.attachAnimation(mySprite, anim)
game.onUpdate(function () {
    if (mySprite.vy > 0) {
        animation.setAction(mySprite, ActionKind.Jumping)
    }
    if (mySprite.bottom > 120 || mySprite.top < 0) {
        game.setGameOverPlayable(false, music.melodyPlayable(music.spooky), false)
        game.over(false)
    }
})
game.onUpdateInterval(1500, function () {
    gap = randint(0, 3)
    if (gap == 0) {
        topImage = img`
            . . . f f . . f f . . f f . . . 
            . . . f 4 f f 4 f f f 4 f . . . 
            . . f f 4 4 e 4 4 4 4 4 f . . . 
            . f 4 e e 4 4 4 4 4 4 e f . . . 
            f 4 4 f e e 4 4 4 4 4 4 f . . . 
            f 5 f . f e 5 5 f f 5 5 e f . . 
            f f . . f 5 5 5 e e 5 5 5 f e . 
            . . . . e 5 f 4 4 4 4 f 5 e e . 
            . . e e e 4 4 4 4 4 4 4 4 e e . 
            . . e 3 e e 4 4 4 4 4 4 e e e . 
            . e 3 3 4 e e 4 4 4 4 e e 3 e . 
            . e 3 4 4 e . . e e e e 4 3 e . 
            . e e e e . . . . . . e 4 3 e . 
            . . e e . . . . . . . e e e e . 
            `
        bottomImage = img`
            . . . . f f f . . . . f f f 
            . . . . f f f f . . f f f f 
            . . . . f e f f f f f f e f 
            . . . . f 3 e f f f f e 3 f 
            . . . . f e 3 f f f f 3 e f 
            . . . . f f f f f f f f f f 
            f f f . f f 2 f f f f 2 f f 
            f f f . f f f 2 f f 2 f f f 
            f f f . f f f f 3 3 f f f f 
            f f f f f f f f f f f f f . 
            f f f f f f f f f f f f f . 
            . f f f f f f f f f f f f . 
            . . . f f f f f f f f f f . 
            . . . f f . . f f . . f f . 
            `
    } else if (gap == 1) {
        topImage = img`
            . . . f f . . f f . . f f . . . 
            . . . f 4 f f 4 f f f 4 f . . . 
            . . f f 4 4 e 4 4 4 4 4 f . . . 
            . f 4 e e 4 4 4 4 4 4 e f . . . 
            f 4 4 f e e 4 4 4 4 4 4 f . . . 
            f 5 f . f e 5 5 f f 5 5 e f . . 
            f f . . f 5 5 5 e e 5 5 5 f e . 
            . . . . e 5 f 4 4 4 4 f 5 e e . 
            . . e e e 4 4 4 4 4 4 4 4 e e . 
            . . e 3 e e 4 4 4 4 4 4 e e e . 
            . e 3 3 4 e e 4 4 4 4 e e 3 e . 
            . e 3 4 4 e . . e e e e 4 3 e . 
            . e e e e . . . . . . e 4 3 e . 
            . . e e . . . . . . . e e e e . 
            `
        bottomImage = img`
            . . . . f f f . . . . f f f 
            . . . . f f f f . . f f f f 
            . . . . f e f f f f f f e f 
            . . . . f 3 e f f f f e 3 f 
            . . . . f e 3 f f f f 3 e f 
            . . . . f f f f f f f f f f 
            f f f . f f 2 f f f f 2 f f 
            f f f . f f f 2 f f 2 f f f 
            f f f . f f f f 3 3 f f f f 
            f f f f f f f f f f f f f . 
            f f f f f f f f f f f f f . 
            . f f f f f f f f f f f f . 
            . . . f f f f f f f f f f . 
            . . . f f . . f f . . f f . 
            `
    } else if (gap == 2) {
        topImage = img`
            . . . f f . . f f . . f f . . . 
            . . . f 4 f f 4 f f f 4 f . . . 
            . . f f 4 4 e 4 4 4 4 4 f . . . 
            . f 4 e e 4 4 4 4 4 4 e f . . . 
            f 4 4 f e e 4 4 4 4 4 4 f . . . 
            f 5 f . f e 5 5 f f 5 5 e f . . 
            f f . . f 5 5 5 e e 5 5 5 f e . 
            . . . . e 5 f 4 4 4 4 f 5 e e . 
            . . e e e 4 4 4 4 4 4 4 4 e e . 
            . . e 3 e e 4 4 4 4 4 4 e e e . 
            . e 3 3 4 e e 4 4 4 4 e e 3 e . 
            . e 3 4 4 e . . e e e e 4 3 e . 
            . e e e e . . . . . . e 4 3 e . 
            . . e e . . . . . . . e e e e . 
            `
        bottomImage = img`
            . . . . f f f . . . . f f f 
            . . . . f f f f . . f f f f 
            . . . . f e f f f f f f e f 
            . . . . f 3 e f f f f e 3 f 
            . . . . f e 3 f f f f 3 e f 
            . . . . f f f f f f f f f f 
            f f f . f f 2 f f f f 2 f f 
            f f f . f f f 2 f f 2 f f f 
            f f f . f f f f 3 3 f f f f 
            f f f f f f f f f f f f f . 
            f f f f f f f f f f f f f . 
            . f f f f f f f f f f f f . 
            . . . f f f f f f f f f f . 
            . . . f f . . f f . . f f . 
            `
    } else {
        topImage = img`
            . . . f f . . f f . . f f . . . 
            . . . f 4 f f 4 f f f 4 f . . . 
            . . f f 4 4 e 4 4 4 4 4 f . . . 
            . f 4 e e 4 4 4 4 4 4 e f . . . 
            f 4 4 f e e 4 4 4 4 4 4 f . . . 
            f 5 f . f e 5 5 f f 5 5 e f . . 
            f f . . f 5 5 5 e e 5 5 5 f e . 
            . . . . e 5 f 4 4 4 4 f 5 e e . 
            . . e e e 4 4 4 4 4 4 4 4 e e . 
            . . e 3 e e 4 4 4 4 4 4 e e e . 
            . e 3 3 4 e e 4 4 4 4 e e 3 e . 
            . e 3 4 4 e . . e e e e 4 3 e . 
            . e e e e . . . . . . e 4 3 e . 
            . . e e . . . . . . . e e e e . 
            `
        bottomImage = img`
            . . . . f f f . . . . f f f 
            . . . . f f f f . . f f f f 
            . . . . f e f f f f f f e f 
            . . . . f 3 e f f f f e 3 f 
            . . . . f e 3 f f f f 3 e f 
            . . . . f f f f f f f f f f 
            f f f . f f 2 f f f f 2 f f 
            f f f . f f f 2 f f 2 f f f 
            f f f . f f f f 3 3 f f f f 
            f f f f f f f f f f f f f . 
            f f f f f f f f f f f f f . 
            . f f f f f f f f f f f f . 
            . . . f f f f f f f f f f . 
            . . . f f . . f f . . f f . 
            `
    }
    gapImage = image.create(2, scene.screenHeight())
    gapImage.fill(1)
    gapSprite = sprites.create(gapImage, SpriteKind.Gap)
    gapSprite.setFlag(SpriteFlag.AutoDestroy, true)
    gapSprite.setFlag(SpriteFlag.Invisible, true)
    gapSprite.left = scene.screenWidth()
    gapSprite.vx = -45
    projectile = sprites.createProjectileFromSide(topImage, -45, 0)
    projectile.top = 0
    projectile = sprites.createProjectileFromSide(bottomImage, -45, 0)
    projectile.bottom = scene.screenHeight()
})
