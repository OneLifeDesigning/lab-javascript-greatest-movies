// Iteration 1: All directors? - Get the array of all directors.
const getAllDirectors = function(movies) {
    const moviesDirector = movies.map(movie => movie.director)
        // _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors. How could you "clean" a bit this array and make it unified (without duplicates)?
    return moviesDirector.filter((director, index) => moviesDirector.indexOf(director) === index)
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
const howManyMovies = movies => movies.filter(movie => movie.director === 'Steven Spielberg' && movie.genre.indexOf('Drama') !== -1).length

// Iteracion 2: Other solution for multiples genres and directors
// function howManyMovies(movies, nameDirector, genre) {
// return movies.filter((movie) => movie.director === nameDirector && movie.genre.indexOf(genre) !== -1).length
// }

// Iteration 3: All rates average - Get the average of all rates with 2 decimals
const ratesAverage = movies => !movies.length ? 0 : Number((movies.filter(movie => movie.rate).reduce(function(acumulator, current) { return acumulator + (!current.rate ? 0 : current.rate) }, 0) / movies.length).toFixed(2))


// Iteration 4: Drama movies - Get the average of Drama Movies
const dramaMoviesRate = function(movies) {
    const dramaFilms = movies.filter(movie => movie.genre.indexOf('Drama') !== -1 && movie.genre.length === 1)
    if (!dramaFilms.length) {
        return 0
    }
    const reduceDramaFilms = dramaFilms.reduce(
        function(acumulator, current) {
            return acumulator + (!current.rate ? 0 : current.rate)
        }, 0)

    return Number((reduceDramaFilms / dramaFilms.length).toFixed(2))
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
const compareByYearOrTitle = (a, b) => a.year === b.year ? [a, b].sort((a, b) => a.title > b.title ? -1 : 1) : a.year > b.year ? -1 : 1

const orderByYear = movies => movies.length === 1 ? movies : movies.sort(compareByYearOrTitle).reverse().slice()

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
const compareByTitleStrings = function(a, b) {
    return a > b ? 1 : -1
}

const orderAlphabetically = function(movies) {
    const moviesTitlesString = []
    movies.forEach(movie => {
        moviesTitlesString.push(movie.title.toString())
    })
    return (moviesTitlesString.sort(compareByTitleStrings)).slice(0, 20)
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes

const turnHoursToMinutes = function(movies) {
    const moviesDuration = JSON.parse(JSON.stringify(movies))
    moviesDuration.forEach(movie => {
        const hours = movie.duration.indexOf('h') !== -1 ? Number(movie.duration.slice(0, movie.duration.indexOf('h'))) : 0
        const minutes = movie.duration.indexOf('min') !== -1 ? Number(movie.duration.slice(movie.duration.indexOf('min') - 2, movie.duration.indexOf('min'))) : 0
        movie.duration = !hours ? minutes : (!minutes ? hours * 60 : (hours * 60) + minutes)
    })
    return moviesDuration
}


// BONUS - Iteration 8: Best yearly rate average - Best yearly rate average

const bestYearAvg = function(movies) {
    if (!movies.length) {
        return null
    }
    const movieYears = movies.map((movie) => movie.year)

    const movieYearsUnique = []
    for (const iterator of movieYears) {
        if (movieYearsUnique.indexOf(iterator) === -1) {
            movieYearsUnique.push(iterator)
        }
    }
    const onlyYearsFilms = []
    for (let index = 0; index < movieYearsUnique.length; index++) {
        if (movies.filter(movie => movie.year === movieYearsUnique[index]).length !== 0) {
            onlyYearsFilms.push(movies.filter(movie => movie.year === movieYearsUnique[index]))
        }
    }

    console.log(onlyYearsFilms);

    let acumulatorLength = 0
    for (let index = 0; index < onlyYearsFilms.length; index++) {
        if (ratesAverage(onlyYearsFilms[index]) >= acumulatorLength) {
            acumulatorLength = ratesAverage(onlyYearsFilms[index])
            moreFilmsOnYear = onlyYearsFilms[index][0].year
        }
    }

    return `The best year was ${moreFilmsOnYear} with an average rate of ${acumulatorLength}`
}