class ProductDto {
  constructor(data) {
    this.title = data.title;
    this.description = data.description;
    this.price = data.price;

    const validStates = ['new', 'used'];
    this.state = validStates.includes(data.state) ? data.state : 'new';

    const validStatuses = ['pending', 'available', 'sold'];
    this.status = validStatuses.includes(data.status) ? data.status : 'pending';

    this.categoryId = data.categoryId;
  }
}

export default ProductDto;