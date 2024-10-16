document.addEventListener("DOMContentLoaded", function() {
    const monthYearElement = document.getElementById("month-year");
    const calendarDaysElement = document.getElementById("calendar-days");
    const toggleModeButton = document.getElementById("toggle-mode");
    const prevMonthButton = document.getElementById("prev-month");
    const nextMonthButton = document.getElementById("next-month");
    
    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let currentDay = today.getDate();

    // Takvimi render etme fonksiyonu
    function renderCalendar(month, year) {
        calendarDaysElement.innerHTML = "";
        
        let firstDay = new Date(year, month, 1).getDay(); // İlk günün haftanın hangi günü olduğu
        let daysInMonth = new Date(year, month + 1, 0).getDate(); // O ayda kaç gün var

        // Ay ve yıl bilgisini güncelle
        monthYearElement.innerHTML = `${months[month]} ${year}`;

        // Günleri ekle (boş günler için)
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement("div");
            calendarDaysElement.appendChild(emptyDiv);
        }

        // Günleri ekle
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = day;

            // Bugün olan günü mavi ile işaretle
            if (day === currentDay && month === today.getMonth() && year === today.getFullYear()) {
                dayDiv.classList.add("selected");
            }

            // Diğer günler için gölge efekti
            if (!(day === currentDay && month === today.getMonth() && year === today.getFullYear())) {
                dayDiv.classList.add("shadowed-day");
            }

            calendarDaysElement.appendChild(dayDiv);
        }
    }

    // Başlangıçta takvimi yükle
    renderCalendar(currentMonth, currentYear);

    // Dark/Light mod geçiş işlemi
    toggleModeButton.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
    });

    // Ayı geri alma butonuna tıklayınca
    prevMonthButton.addEventListener("click", function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11; // Aralık ayına geç
            currentYear--; // Bir yıl geri git
        }
        renderCalendar(currentMonth, currentYear);
    });

    // Ayı ileri alma butonuna tıklayınca
    nextMonthButton.addEventListener("click", function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0; // Ocak ayına geç
            currentYear++; // Bir yıl ileri git
        }
        renderCalendar(currentMonth, currentYear);
    });
});
