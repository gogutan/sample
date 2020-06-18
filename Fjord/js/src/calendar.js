// isSameDay?をつくる formattedMonthでDate生成
// クラスを作る
// 関数内で Date を生成する

// 一度だけ生成したいため、getFormattedMonth内で生成？クラス変数に持たせる

const today = new Date()
const todaysYear = today.getFullYear()
const todaysMonth = today.getMonth() + 1
const todaysDate = today.getDate()

// 月情報の取得（年、月、最初の曜日、最終日）
const getMonthInfo = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const startingDay = new Date(year, month - 1, 1).getDay()
  const lastDay = new Date(year, month, 0).getDate()
  return {
    year: year,
    month: month,
    startingDay: startingDay,
    lastDay: lastDay
  }
}

// フォーマット済み月カレンダーの取得
const getFormattedMonth = (date) => {
  const { year, month, startingDay, lastDay } = getMonthInfo(date)
  const formattedMonth = [
    ['  ', '  ', month + '月', year, '  ', '  ', '  '],
    ['日', '月', '火', '水', '木', '金', '土']
  ]
  let currentDay = 1
  for (let i = 0; i < 6; i++) {
    const formattedWeek = i === 0 ? new Array(startingDay).fill('  ') : []
    while (formattedWeek.length < 7) {
      let output =
        currentDay <= lastDay ? currentDay.toString().padStart(2, ' ') : '  '
      if (checkToday(year, month, currentDay)) {
        output = reverseColor(output)
      }
      formattedWeek.push(output)
      currentDay++
    }
    formattedMonth.push(formattedWeek)
  }
  return formattedMonth
}

class Today {
  
}
// 今日の年月日と一致するか確認
const checkToday = (year, month, date) => {
  if (year === todaysYear && month === todaysMonth && date === todaysDate) {
    return true
  } else {
    return false
  }
}

// 色を反転
const reverseColor = (string) => {
  return '\x1b[7m' + string + '\x1b[0m'
}

const argv = require('minimist')(process.argv.slice(2))
const date = new Date()
date.setMonth('m' in argv ? argv.m - 1 : todaysMonth - 1)
date.setFullYear('y' in argv ? argv.y : todaysYear)

getFormattedMonth(date).forEach((currentRow) => {
  console.log(currentRow.join(' '))
})
