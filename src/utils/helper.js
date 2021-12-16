const paginate = (results = [], page = 1, limit = 10) => {
        const start = (page - 1) * limit;
        const end = page * limit;
        return results.slice(start, end);
};

const handleMap = ({ c, o, ...rest }) => {
        return {
                ...rest,
                c,
                o,
                ls: Number(o - c).toFixed(2),
                g: Number(c - o).toFixed(2),
                p: (((Number(c) - Number(o)) / Number(o)) * 100).toFixed(2),
        };
};

const extractValueOperator = (queryValue) => {
        if (typeof queryValue === 'object') {
                if (queryValue['lte']) {
                        return { value: queryValue['lte'], operator: 'lte' };
                }
                if (queryValue['gte']) {
                        return { value: queryValue['gte'], operator: 'gte' };
                }
        } else {
                return { value: queryValue, operator: 'eq' };
        }
};

const filterCriteria = (actualValue, param) => {
        const { operator, value } = param;
        switch (operator) {
                case 'lte': {
                        return actualValue <= value;
                }

                case 'gte': {
                        return actualValue >= value;
                }

                case 'eql': {
                        return actualValue === value;
                }

                default: {
                        return false;
                }
        }
};

export { paginate, handleMap, extractValueOperator, filterCriteria };
