import React from 'react';

import createRender from 'found/lib/createRender';

export default createRender({
    renderError({error}) {
        switch (error.status) {
            default:
                return <div>Error {error.status}</div>;
        }
    }
});
