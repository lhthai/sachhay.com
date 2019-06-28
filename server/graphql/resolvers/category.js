import Category from '../../model/category'
import Book from '../../model/book'

const getBooks = async (bookIds, page) => {
    try {
        const books = await Book.find({ _id: { $in: bookIds } }).limit(20).skip(20 * (page - 1));
        const count = await Book.find({ _id: { $in: bookIds } }).countDocuments();
        books.map(book => {
            return {
                ...book._doc,
                id: book.id,
                category: getCategory.bind(this, book.category)
            }
        })
        return { books, count };
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
const convertCategoryUrl = (name) => {
    let str = name.toLowerCase();
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

export async function addCategory(args) {
    const category_url = convertCategoryUrl(args.categoryInput.name)
    const { name, description } = args.categoryInput;
    const temp = await Category.findOne({ name: name });
    if (temp) {
        throw new Error("This category is already exist.")
    } else {
        try {

            const newCategory = new Category({
                name,
                description,
                category_url
            }, err => { if (err) throw err })

            newCategory.save()
            return newCategory
        } catch (error) {
            throw error
        }
    }
}

export async function updateCategory(args) {
    try {
        const updatedCategory = await Category.findOneAndUpdate({ _id: args.id }, args, { new: true })
        return {
            ...updatedCategory._doc,
            id: updatedCategory.id,
            books: getBooks.bind(this, updatedCategory._doc.books)
        }
    } catch (error) {
        throw error
    }
}

export async function removeCategory(args) {
    try {
        const removedCategory = await Category.findByIdAndRemove({ _id: args.id }).exec()
        return {
            ...removedCategory._doc,
            id: removedCategory.id,
            books: getBooks.bind(this, removedCategory._doc.books)
        }
    } catch (error) {
        throw error;
    }
}

export async function categories() {
    try {
        const categories = await Category.find();
        return categories.map(category => {
            return {
                ...category._doc,
                id: category.id,
                books: getBooks.bind(this, category._doc.books)
            }
        })
    } catch (error) {

    }
}

export const categoryByCategoryUrl = async (args) => {
    try {
        const category = await Category.findOne({ category_url: args.category_url })
        const booksArr = await getBooks(category._doc.books, args.page)
        return {
            ...category._doc,
            id: category.id,
            books: booksArr.books,
            count: booksArr.count
        }
    } catch (error) {
        throw error
    }
}