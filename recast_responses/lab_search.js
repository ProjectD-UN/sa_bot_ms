const lab_search = (docs, city) => {
    if (docs.length === 0) {
        return [{
            type: 'quickReplies',
            content: {
                title: `Lo siento, no encontre registros de laboratorios en ${city}.`,
                buttons: [{title: 'Volver a empezar', value: 'Start Over'}]
            }
        }]
    }    
    const cards = docs.map(labs => ({
        title: labs['nombre'].toUpperCase(),
        subtitle: labs['direccion'],
        buttons: [{
            type: 'phone_number',
            title: 'Teléfono',
            value: labs['telefono'].split(",")[0]
        }]
    }))

    return [
        {
            type: 'text',
            content: `Estos fueron los laboratorios que encontre en ${city}`
        },
        { type: 'carousel', content: cards}
    ]
}

module.exports = lab_search;