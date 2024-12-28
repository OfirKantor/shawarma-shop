import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
        import { getDatabase, set, ref, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

        const firebaseConfig = {
            apiKey: "AIzaSyCBZL_9FOWgUWdhX61F-etff_PVrO45wXI",
            authDomain: "shawarma-tests-e0de6.firebaseapp.com",
            projectId: "shawarma-tests-e0de6",
            storageBucket: "shawarma-tests-e0de6.firebasestorage.app",
            messagingSenderId: "344905791041",
            appId: "1:344905791041:web:cb8f996195762cc10af8c0"
        };

        document.addEventListener("DOMContentLoaded", loadInventory);
        document.querySelector("#saveButton").addEventListener("click", saveData);
        document.querySelector("#backToOrdersBtn").addEventListener("click", function(){window.location.href = 'shop.html';});
       


        const app = initializeApp(firebaseConfig);
        const db = getDatabase();

        const inventoryRef = ref(db, "config/inventory");

        function loadInventory() {
            get(inventoryRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const inventory = snapshot.val();
                    const shawarma = inventory.shawarma;
                    const fries = inventory.fries;
                    const coke = inventory.coke;
                    const zero = inventory.zero;

                    document.getElementById('shawarma').value = shawarma;
                    document.getElementById('fries').value = fries;
                    document.getElementById('coke').value = coke;
                    document.getElementById('zero').value = zero;

                    
                }
            }).catch((error) => {
                console.error("Error loading shop status:", error);
            });
        }

        function saveData() {
            const shawarma = parseInt(document.getElementById('shawarma').value) || 0;
            const fries = parseInt(document.getElementById('fries').value) || 0;
            const coke = parseInt(document.getElementById('coke').value) || 0;
            const zero = parseInt(document.getElementById('zero').value) || 0;

            const inventory = {
                coke: coke,
                fries: fries,
                shawarma: shawarma,
                zero: zero
            }; 

            set(ref(db, "config/inventory"), inventory);

            // set(ref(inventoryRef), inventory);
             
        }


        // Optional: Enforce integer-only input
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('input', function () {
                this.value = this.value.replace(/[^0-9\-]/g, ''); // Allow only integers
            });
        });