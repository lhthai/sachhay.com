import Book from '../../model/book'
import Category from '../../model/category'
import axios from 'axios'
import cheerio from 'cheerio'

const getBooks = async (bookIds) => {
    try {
        const books = await Book.find({ _id: { $in: bookIds } })
        books.map(book => {
            return {
                ...book._doc,
                id: book.id,
                category: getCategory.bind(this, book.category)
            }
        })
        return books;
    } catch (error) {
        throw error
    }
}

const getCategory = async categoryId => {
    try {
        const category = await Category.findById(categoryId);
        return {
            ...category._doc,
            id: category.id,
            books: getBooks.bind(this, category._doc.books)
        }
    } catch (error) {
        throw error
    }
}

const convertBookUrl = (title, author) => {
    let str = (title + " " + author).toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    str = str.replace(/\s+/g, '-');
    str = str.trim();
    return str;
}

export async function addBook(args) {
    const book_url = convertBookUrl(args.bookInput.title, args.bookInput.author)
    const book = new Book({
        title: args.bookInput.title,
        author: args.bookInput.author,
        thumbnail: args.bookInput.thumbnail,
        category: args.bookInput.category,
        book_url
    });
    const checkBook = await Book.findOne({ $and: [{ title: book.title }, { category: book.category }] });
    if (checkBook) {
        throw new Error("This book is already exist.")
    } else {
        let createdBook;
        try {
            const result = await book.save();
            createdBook = {
                ...result._doc,
                id: result._doc._id.toString(),
                category: getCategory.bind(this, result._doc.category)
            }
            const category = await Category.findById(book.category)
            if (!category) {
                throw new Error("Category not found.")
            }
            category.books.push(book);
            await category.save()
            return createdBook;
        } catch (error) {
            throw error
        }
    }
}

export async function updateBook(args) {
    try {
        const updatedBook = await Book.findOneAndUpdate({ _id: args.id }, args, { new: true })
        return {
            ...updatedBook._doc,
            id: updatedBook.id,
            category: getCategory.bind(this, updatedBook._doc.category)
        }
    } catch (error) {
        throw error
    }
}

export async function removeBook(args) {
    try {
        const removedBook = await Book.findByIdAndRemove({ _id: args.id }).exec();
        return {
            ...removedBook._doc,
            id: removedBook.id,
            category: getCategory.bind(this, removedBook._doc.category)
        }
    } catch (error) {
        throw error
    }
}

export async function books(args) {
    try {
        const books = await Book.find().limit(20).skip(20 * args.page).exec();
        return books.map(book => {
            return {
                ...book._doc,
                id: book.id,
                category: getCategory.bind(this, book._doc.category),
            }
        })
    } catch (error) {
        throw error
    }
}

export async function bookByBookUrl(args) {
    try {
        const book = await Book.findOne({ book_url: args.book_url })
        return {
            ...book._doc,
            id: book.id,
            category: getCategory.bind(this, book._doc.category)
        }
    } catch (error) {
        throw error
    }
}

export async function searchBooks(args) {
    try {
        const books = await Book.find({ $text: { $search: args.query } }).limit(20).skip(20 * (args.page - 1));
        return books.map(book => {
            return {
                ...book._doc,
                id: book.id,
                category: getCategory.bind(this, book._doc.category),
            }
        })
    } catch (error) {
        throw error
    }
}

export async function crawlBooks(args) {
    try {
        const booksResult = []
        const listBooks = await getBooksInfo(args.url);
        for (let i = 0; i < listBooks.length; i++) {
            const item = await listBooks[i]
            const book = new Book({
                title: item.title,
                author: item.author,
                thumbnail: item.thumbnail,
                book_url: item.book_url,
                category: args.category,
                download_epub: item.download_epub,
                download_mobi: item.download_mobi,
                download_pdf: item.download_pdf
            })
            const checkBook = await Book.findOne({ $and: [{ title: book.title }, { category: book.category }] });
            if (!checkBook) {
                await book.save();
                booksResult.push(book)
                const category = await Category.findById(book.category)
                if (category) {
                    category.books.push(book);
                    await category.save()
                }

            }
        }
        return booksResult;
    } catch (error) {
        throw error
    }
}

function getUrl(url) {
    return axios.get(url)
        .then(res => {
            if (res.status === 200) {
                const html = res.data
                const $ = cheerio.load(html)
                const listUrl = []
                $('.ebook').each((i, e) => {
                    listUrl.push({
                        url: $(e).find('a').attr('href')
                    })
                })
                return listUrl
            }
        })
        .catch(err => console.log(err))
}

function getBooksInfo(url) {
    return getUrl(url).then(res => {
        const list = []
        res.forEach((value, index) => {
            const result = axios.get(value.url)
                .then(response => {
                    if (response.status === 200) {
                        const html = response.data
                        const $ = cheerio.load(html)

                        const title = $('.thong_tin_ebook').find('.ebook_title').text().trim()
                        const author = $('.thong_tin_ebook').find('h5').first().text().trim().split(': ').splice(1, 1).join("")
                        const thumbnail = $('.thong_tin_ebook').find('.cover').find('img').attr('src')
                        const download_epub = $('.thong_tin_ebook').find('.btn-primary').attr('href')
                        const download_mobi = $('.thong_tin_ebook').find('.btn-success').attr('href')
                        const download_pdf = $('.thong_tin_ebook').find('.btn-danger').attr('href')
                        const book_url = convertBookUrl(title, author)
                        // const category = categorId
                        return ({
                            title,
                            author,
                            thumbnail,
                            book_url,
                            download_epub,
                            download_mobi,
                            download_pdf
                        })
                    }
                })
                .catch(error => console.log(error))
            list.push(result)
        })
        return list
    })
}