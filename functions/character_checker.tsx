/// A class wrapper for the character functions the server uses.
export class CharacterCheckers {
    /// Function to check if the search_id contains only integers
    static containsOnlyIntegers(input: string) {
        const integerRegex = /^\d+$/;
        return integerRegex.test(input);
    }
}