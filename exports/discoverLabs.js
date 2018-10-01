const discoverLabs = (docs, city) => {
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
        title: labs['Nombre del Laboratorio'].toUpperCase(),
        subtitle: labs['Dirección'],
        buttons: [{
            type: 'phone_number',
            title: 'Teléfono',
            value: labs['Teléfono']
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

module.exports = discoverLabs;