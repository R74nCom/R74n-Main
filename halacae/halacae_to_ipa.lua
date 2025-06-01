-- by the same guy who made the halacae reclist (@mikijeenki on Discord)

local function word_to_IPA(word)
    word = string.lower(word)

    local vowels = {
        { "ae", "ⓐ" },
        { "oo", "ⓞ" },
        { "a", "ɒ" },
        { "e", "e" },
        { "i", "i" },
        { "o", "oʊ" },
        { "u", "ʌ" },
        { "ⓐ", "aɪ" },
        { "ⓞ", "u" }
    }

    local vowelsum = "[ɒaɪeioʊuʌ]"

    local consonants = {
        { "c", "k" },
        { "h", "h" },
        { "l", "l" },
        { "m", "m" },
        { "p", "p" },
        { "r", "ɹ" },
        { "s", "s" },
        { "y", "j" },
        { "-", "ʔ" }
    }

    for _, vowel in ipairs(vowels) do
        if string.find(word, "^" .. vowel[1]) then
            word = "-" .. word
        end
        word = word:gsub(vowel[1], vowel[2])
    end

    for _, consonant in ipairs(consonants) do
        word = word:gsub(
            "(" .. vowelsum .. ")(" .. consonant[1] .. ")",
            "%1.%2"
        )
        word = word:gsub(consonant[1], consonant[2])
    end

    return word
end

local function halIPA(text)
    local punctuation = "[.,:;'‘’\"“”!?…]"
    text = text:gsub(punctuation, "")

    local words = text:gmatch("%S+")
    local ipas = {}
    for word in words do
        table.insert(ipas, word_to_IPA(word))
    end

    local ipa = table.concat(ipas, " ")
    return ipa
end

local function test()
    local tests = {
        { "Ha Mahae e parae.", "hɒ mɒ.haɪ ʔe pɒ.ɹaɪ" },
        { "Samoo pare oma, a-ooha cu hu para.", "sɒ.mu pɒ.ɹe ʔoʊ.mɒ ʔɒ.ʔu.hɒ kʌ hʌ pɒ.ɹɒ" },
        { "Halacae", "hɒ.lɒ.kaɪ" }
    }

    local tested = ""
    for i, test in ipairs(tests) do
        if test[2] == halIPA(test[1]) then
            tested = tested .. i .. ") \27[92m✓\27[0m\n"
        else
            tested = tested .. i .. ") \27[91m✗\27[0m\n"
            tested = tested .. "expected" .. test[2] .. "\n"
            tested = tested .. "actually" .. halIPA(test[1]) .. "\n"
        end
    end

    print(tested)
end

-- test()