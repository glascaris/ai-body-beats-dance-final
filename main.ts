// movement number 2
ml.onStart(ml.event.MakeCircles, function () {
    if (GameOver == 0) {
        basic.showIcon(IconNames.Diamond)
        PlayMusic(MusicCircleList)
        CheckMove(2)
    }
})
function CreateDanceSequence () {
    previous_random_number = -1
    // Update each 5 elements of the list with a random number from 1 to 3 .
    // No consecutives same numbers are allowed
    for (let index = 0; index <= 4; index++) {
        random_number = randint(1, 3)
        // keeps generate random numbers until the new one is different from the previous one
        while (previous_random_number == random_number) {
            random_number = randint(1, 3)
        }
        DanceMoveList[index] = random_number
        previous_random_number = random_number
    }
}
// create a dance sequence with 5 moves.
input.onButtonPressed(Button.A, function () {
    music.play(music.builtinPlayableSoundEffect(soundExpression.giggle), music.PlaybackMode.UntilDone)
    basic.showString("NEW")
    Initialize()
    CreateDanceSequence()
    basic.showIcon(IconNames.Yes)
    basic.showString("A+B")
})
function PlayMusic (ListofTones: any[]) {
    for (let value of ListofTones) {
        music.play(music.tonePlayable(value, music.beat(BeatFraction.Double)), music.PlaybackMode.UntilDone)
    }
}
function CheckMove (DanceMoveName: number) {
    if (DanceMoveList[MoveOrder] == DanceMoveName) {
        success = 1
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.BaDing), music.PlaybackMode.InBackground)
        MoveOrder += 1
    } else {
        success = 0
        GameOver = 1
        basic.showIcon(IconNames.Skull)
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Wawawawaa), music.PlaybackMode.UntilDone)
    }
    // All the 5 moves have been completed with success
    if (MoveOrder == 5 && success == 1) {
        GameOver = 1
        basic.showIcon(IconNames.Heart)
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Prelude), music.PlaybackMode.InBackground)
    }
}
function ShowDanceChallange () {
    for (let value of DanceMoveList) {
        if (value == 1) {
            basic.showIcon(IconNames.Happy)
            PlayMusic(MusicWaveList)
        } else if (value == 2) {
            basic.showIcon(IconNames.Diamond)
            PlayMusic(MusicCircleList)
        } else if (value == 3) {
            basic.showIcon(IconNames.Confused)
            PlayMusic(MusicClapList)
        }
        basic.pause(1000)
    }
}
// movement number 3
ml.onStart(ml.event.Clap, function () {
    if (GameOver == 0) {
        basic.showIcon(IconNames.Confused)
        PlayMusic(MusicClapList)
        CheckMove(3)
    }
})
input.onButtonPressed(Button.B, function () {
    basic.showLeds(`
        . # # # .
        . # . . .
        . . # . .
        . . . # .
        . # # # .
        `)
    success = 0
    MoveOrder = 0
    GameOver = 0
})
// movement number 1
ml.onStart(ml.event.Wave, function () {
    if (GameOver == 0) {
        basic.showIcon(IconNames.Happy)
        PlayMusic(MusicWaveList)
        CheckMove(1)
    }
})
function Initialize () {
    DanceMoveList = [
    0,
    0,
    0,
    0,
    0
    ]
    // Array of 3 tones with their frequency values
    MusicWaveList = [131, 147, 165]
    MusicCircleList = [349, 392, 440]
    MusicClapList = [784, 880, 988]
    success = 0
    MoveOrder = 0
    GameOver = 1
    music.setVolume(168)
}
input.onLogoEvent(TouchButtonEvent.Released, function () {
    ShowDanceChallange()
    basic.showIcon(IconNames.Chessboard)
    basic.showString("B")
})
let MusicClapList: number[] = []
let MusicWaveList: number[] = []
let success = 0
let MoveOrder = 0
let DanceMoveList: number[] = []
let random_number = 0
let previous_random_number = 0
let MusicCircleList: number[] = []
let GameOver = 0
basic.showLeds(`
    . . . . .
    . . . . .
    . . # . .
    . . . . .
    . . . . .
    `)
