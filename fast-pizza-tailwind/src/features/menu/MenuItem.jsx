import { useDispatch, useSelector } from 'react-redux';
import DeleteItem from './../cart/DeleteItem';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addItem, getCurrentQuantity } from './../cart/cartSlice'
import UpdateQuantity from '../cart/UpdateQuantity';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getCurrentQuantity(id))
  const isInCart = currentQuantity > 0
  const dispatch = useDispatch()

  function handleAddItem() {
    const newItem = {
      pizzaId: id,
      name: name,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: unitPrice * 1
    }
    dispatch(addItem(newItem))
  }
  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {
            isInCart &&
            (<div className='flex items-center gap-3 sm:gap-8'>
              <UpdateQuantity pizzaId={id} currentQuantity={currentQuantity} />
              <DeleteItem pizzaId={id} />
            </div>)
          }

          {
            !soldOut &&
            !isInCart &&
            <Button onClick={handleAddItem} type="small">Add to cart</Button>
          }

        </div>
      </div>
    </li>
  );
}

export default MenuItem;
