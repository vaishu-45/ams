// import { useEffect, useState } from "react";
// import axios from "axios";

// const AdminProducts = () => {
//   const [products, setProducts] = useState([]);

//   const fetchProducts = () => {
//     axios.get("http://localhost:5000/admin/products/all")
//       .then(res => setProducts(res.data));
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const toggleStock = (id, currState) => {
//     axios.put(`http://localhost:5000/admin/products/update/${id}`, {
//       inStock: !currState
//     }).then(fetchProducts);
//   };

//   return (
//     <div>
//       <h2>All Products</h2>

//       <table border="1">
//         <thead>
//           <tr>
//             <th>Image</th>
//             <th>Name</th>
//             <th>Weight</th>
//             <th>Price</th>
//             <th>Offer</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {products.map(p => (
//             <tr key={p._id}>
//               <td><img src={p.image} width="60" /></td>
//               <td>{p.name}</td>
//               <td>{p.weight}g</td>
//               <td>₹{p.price}</td>
//               <td>{p.offer}%</td>
//               <td>{p.inStock ? "In Stock" : "Out of Stock"}</td>
//               <td>
//                 <button onClick={() => toggleStock(p._id, p.inStock)}>
//                   {p.inStock ? "Mark Out of Stock" : "Mark In Stock"}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminProducts;
