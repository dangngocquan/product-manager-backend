class Category {
    constructor(id, name, image, level, parentCategoryId, timeAdded, status) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.level = level;
        this.parentCategoryId = parentCategoryId;
        this.timeAdded = timeAdded;
        this.status = status;
    }
}

module.exports = Category;