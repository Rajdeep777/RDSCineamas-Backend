class MovieModel {
  constructor(
    id,
    name,
    year,
    imdb,
    desc,
    category,
    fullhdSize,
    ultrahdSize,
    imageUrl,
    fullhdLink,
    ultrahdLink
  ) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.imdb = imdb;
    this.desc = desc;
    this.category = category;
    this.fullhdSize = fullhdSize;
    this.ultrahdSize = ultrahdSize;
    this.imageUrl = imageUrl;
    this.fullhdLink = fullhdLink;
    this.ultrahdLink = ultrahdLink;
  }
  static getAll() {
    return movies;
  }
}
const movies = [
  new MovieModel(
    1,
    "John Wick 4",
    2023,
    7.7,
    "With the price on his head ever increasing, legendary hit man John Wick takes his fight against the High Table global as he seeks out the most powerful players in the underworld, from New York to Paris to Japan to Berlin.",
    "Action",
    3.6,
    34,
    "https://image.tmdb.org/t/p/w185/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    "https://drive.usercontent.google.com/download?id=12TJvmGHIWCdpPXeO7EocEaT6zBlRWV4z&export=download&authuser=4",
    "https://drive.usercontent.google.com/download?id=1FiMoDAFi4SXwPbMYI4Tv33YxlqQ8vpq5&export=download&authuser=4"
  ),
  new MovieModel(
    2,
    "Extraction 2",
    2023,
    7,
    "Back from the brink of death, commando Tyler Rake embarks on a dangerous mission to save a ruthless gangster's imprisoned family.",
    "Action",
    5.6,
    18,
    "https://image.tmdb.org/t/p/w185/7gKI9hpEMcZUQpNgKrkDzJpbnNS.jpg",
    "https://drive.usercontent.google.com/download?id=1lRt9kKQJEoZqX36pEwmvWyV75JCdrEPy&export=download&authuser=2",
    "https://drive.usercontent.google.com/download?id=1pF59zVXW6bGEdjkKpX40r7H_vHhC9uKS&export=download&authuser=2"
  ),
  new MovieModel(
    3,
    "Salaar: Part 1 - Ceasefire",
    2023,
    6.6,
    "Just when the prince of Khansaar is about to rise to the throne, a plan of overthrowing him is exercised and only one man can help him retrieve power.",
    "Action",
    4.9,
    17,
    "https://image.tmdb.org/t/p/w185/vzzeYSh6QYyN9CcY0EmdZJvXH4l.jpg",
    "https://drive.usercontent.google.com/download?id=1HlNLQj-F9ucFFseq3AF5_r68-O8N5OtJ&export=download&authuser=2",
    "https://drive.usercontent.google.com/download?id=10fyUqt0BYPnMadGlSmPa-peqUhR-T3aK&export=download&authuser=2"
  ),
];
export default MovieModel;