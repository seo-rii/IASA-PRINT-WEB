let dialog, snackbar, input

if (location.protocol === 'http:') location.protocol = 'https:'

function showSnackbar(str) {
    document.getElementById('snackbar-text').innerText = str
    snackbar.close()
    snackbar.open()
}

function upload(file) {
    showSnackbar('파일을 업로드 하고 있어요.')
    fetch('https://api.iasa.kr/print/upload?ext=' + file.name.split('.').pop(), {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-binary"
        },
        body: file
    }).then(res => res.json()).then((res) => {
        if (!res.success) {
            showSnackbar('업로드에 실패했어요.')
            return
        }
        document.getElementById('code').innerText = res.code
        dialog.open()
    }).catch(() => {
        showSnackbar('업로드에 실패했어요.')
        return
    })
}

function selectFile() {
    input = document.createElement('input');
    input.type = 'file'
    input.onchange = () => {
        upload(input.files[0])
    }
    input.click()
}

document.addEventListener('DOMContentLoaded', () => {
    let t = new Date()
    const textFields = document.querySelectorAll('.mdc-text-field')
    for (const textField of textFields) {
        mdc.textField.MDCTextField.attachTo(textField)
    }
    dialog = new mdc.dialog.MDCDialog(document.querySelector('.mdc-dialog'))
    snackbar = new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'))

    document.getElementById('right').addEventListener('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    })
    document.getElementById('right').addEventListener('drop', (e) => {
        e.stopPropagation()
        e.preventDefault()
        upload(e.dataTransfer.files[0])
    })
})