// DOM elementlarini olish
const mainTextArea = document.getElementById('mainText');
const removeTextArea = document.getElementById('removeText');
const resultTextArea = document.getElementById('resultText');
const removeBtn = document.getElementById('removeBtn');
const copyBtn = document.getElementById('copyBtn');
const resultGroup = document.getElementById('resultGroup');

// Matnni o'chirish funksiyasi
function removeText() {
    const mainText = mainTextArea.value;
    const textToRemove = removeTextArea.value;

    // Agar asosiy matn to'ldirilgan bo'lsa
    if (mainText.trim() === '') {
        alert('⚠️ Iltimos, asosiy matningizni kiriting!');
        mainTextArea.focus();
        return;
    }

    // Agar o'chirish kerak bo'lgan matn to'ldirilgan bo'lsa
    if (textToRemove.trim() === '') {
        alert('⚠️ Iltimos, o\'chirmoqchi bo\'lgan matningizni kiriting!');
        removeTextArea.focus();
        return;
    }

    // Berilgan matnni barcha joylaridan olib tashlash
    // Global replace uchun regex ishlatamiz
    const escapedRemoveText = textToRemove.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedRemoveText, 'g');
    const result = mainText.replace(regex, '');

    // Natijani ko'rsatish
    resultTextArea.value = result.trim();
    resultGroup.style.display = 'block';

    // Natija maydoniga scroll qilish
    setTimeout(() => {
        resultTextArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// Nusxa olish funksiyasi
function copyToClipboard() {
    resultTextArea.select();
    resultTextArea.setSelectionRange(0, 99999); // Mobil qurilmalar uchun

    try {
        document.execCommand('copy');

        // Tugma matnini vaqtincha o'zgartirish
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span class="btn-icon">✅</span> Nusxa olindi!';
        copyBtn.style.background = 'rgba(16, 185, 129, 0.4)';

        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.background = '';
        }, 2000);
    } catch (err) {
        alert('❌ Nusxa olishda xatolik yuz berdi!');
    }
}

// Event listenerlar
removeBtn.addEventListener('click', removeText);
copyBtn.addEventListener('click', copyToClipboard);

// Enter tugmasi bilan ham ishlash (Ctrl+Enter)
mainTextArea.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        removeText();
    }
});
