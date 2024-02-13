import React from 'react';

const ListGroup = (props) => {
    const { items, selectedItem, onItemSelect } = props;

    return (
        <div className="bg-white rounded-lg m-3 overflow-x-auto"> {/* Add overflow-x-auto */}
            <div className="flex items-center border-b border-gray-300 p-3">
                <img className="mr-3 h-8" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMSIgdmlld0JveD0iMCAwIDIyIDIxIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05LjY5NCAtMTApIj48cGF0aCBmaWxsPSIjMjg3NEYwIiBkPSJNMTQuMjc1IDIyLjcwNGMyLjI3Mi0uNDEyIDQuMzQ3LS42MTggNi4yMjUtLjYxOCAxLjg3OCAwIDMuOTUzLjIwNiA2LjIyNS42MThhNS4xNSA1LjE1IDAgMCAxIDQuMjMgNS4wNjhWMzFoLTIwLjkxdi0zLjIyOGE1LjE1IDUuMTUgMCAwIDEgNC4yMy01LjA2OHptMS4yNzQtNy43MjRjMC0yLjU4IDIuMTYzLTQuNjczIDQuODMyLTQuNjczIDIuNjY3IDAgNC44MyAyLjA5MiA0LjgzIDQuNjczIDAgMi41OC0yLjE2MyA0LjY3My00LjgzIDQuNjczLTIuNjcgMC00LjgzMy0yLjA5Mi00LjgzMy00LjY3M3oiLz48ZWxsaXBzZSBjeD0iMjAuNTU3IiBjeT0iMjAiIHJ4PSIyMC41NTciIHJ5PSIyMCIvPjwvZz48L3N2Zz4=" alt="Icon" />
                <div className="font-bold text-lg text-center flex-1">ACCOUNT SETTINGS</div> {/* Add flex-1 */}
            </div>
            <ul className='mt-3'>
                {items.map((item, index) => (
                    <li key={index}
                        className={`py-2 ${item === selectedItem ? 'bg-blue-100 text-blue-500 px-6 rounded-lg' : 'hover:bg-gray-100 px-6 rounded-lg'}`}
                        onClick={() => onItemSelect(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListGroup;
