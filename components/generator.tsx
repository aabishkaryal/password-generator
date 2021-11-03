import React, { useState } from "react";

import {
    ChakraComponent,
    VStack,
    HStack,
    Input,
    InputRightElement,
    Icon,
    Button,
    Text,
    useClipboard,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Tooltip,
    InputGroup,
    Switch,
    IconButton,
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import { FaSyncAlt, FaClipboardCheck, FaClipboard } from "react-icons/fa";

import {
    ALPHABETS,
    AMBIGIOUS_CHARS,
    NUMBERS,
    SPECIAL_CHARS,
} from "@app/constants";
import { GeneratePassword } from "@app/password";

export const Generator: ChakraComponent<"div", {}> = () => {
    const [numLetters, changeNumLetters] = useState(8);
    const [numNumbers, changeNumNumbers] = useState(2);
    const [numSpecialChars, changeNumSpecialChars] = useState(2);
    const [isAmbigious, updateIsAmbigious] = useState(false);
    const [password, updatePassword] = useState(
        GeneratePassword({
            numLetters,
            numNumbers,
            numSpecialChars,
            isAmbigious,
        })
    );
    const { onCopy, hasCopied } = useClipboard(password);

    const updateNumLetters = (nL: number) => {
        changeNumLetters(nL);
        updatePassword(
            GeneratePassword({
                numLetters: nL,
                numNumbers,
                numSpecialChars,
                isAmbigious,
            })
        );
    };

    const updateNumNumbers = (nN: number) => {
        changeNumNumbers(nN);
        updatePassword(
            GeneratePassword({
                numLetters,
                numNumbers: nN,
                numSpecialChars,
                isAmbigious,
            })
        );
    };

    const updateNumSpecialChars = (nSC: number) => {
        changeNumSpecialChars(nSC);
        updatePassword(
            GeneratePassword({
                numLetters,
                numNumbers,
                numSpecialChars: nSC,
                isAmbigious,
            })
        );
    };

    const updateAmbigious = (isAmb: boolean) => {
        updateIsAmbigious(isAmb);
        updatePassword(
            GeneratePassword({
                numLetters,
                numNumbers,
                numSpecialChars,
                isAmbigious: isAmb,
            })
        );
    };

    const regeneratePassword = () => {
        updatePassword(
            GeneratePassword({
                numLetters,
                numNumbers,
                numSpecialChars,
                isAmbigious,
            })
        );
    };

    return (
        <VStack
            spacing={6}
            marginX={4}
            id="generator"
            marginTop={{ base: 8 }}
            w={{ base: "80%", md: "65%", lg: "50%" }}
        >
            <HStack
                justifyContent="space-between"
                padding={4}
                spacing={6}
                width="100%"
                id="display"
            >
                <InputGroup>
                    <Input
                        isReadOnly
                        variant="outline"
                        value={password}
                        isTruncated
                    />
                    <InputRightElement>
                        <IconButton
                            aria-label="Regenerate Password"
                            onClick={regeneratePassword}
                            icon={<Icon as={FaSyncAlt} />}
                            isRound
                            size="sm"
                        />
                    </InputRightElement>
                </InputGroup>
                <Button backgroundColor="transparent" onClick={onCopy}>
                    <HStack spacing={2} padding={4}>
                        <Icon as={hasCopied ? FaClipboardCheck : FaClipboard} />
                        <Text fontSize="md">
                            {hasCopied ? "Copied" : "Copy"}
                        </Text>
                    </HStack>
                </Button>
            </HStack>
            <GeneratorSetting
                value={numLetters}
                onChange={updateNumLetters}
                label="Letters"
                tooltipLabel={ALPHABETS}
            />
            <GeneratorSetting
                value={numNumbers}
                onChange={updateNumNumbers}
                label="Numbers"
                tooltipLabel={NUMBERS}
            />
            <GeneratorSetting
                value={numSpecialChars}
                onChange={updateNumSpecialChars}
                label="Special Characters"
                tooltipLabel={SPECIAL_CHARS}
            />
            <AmbigiousCharSetting
                isAmbigious={isAmbigious}
                updateAmbigious={updateAmbigious}
            />
        </VStack>
    );
};
type AmbigiousCharProps = {
    isAmbigious: boolean;
    updateAmbigious: (ambigious: boolean) => void;
};

const AmbigiousCharSetting: ChakraComponent<"div", AmbigiousCharProps> = ({
    isAmbigious,
    updateAmbigious,
}) => {
    const label = "Ambigious Characters";
    return (
        <HStack id="ambigiousCharacters" spacing={4} alignSelf="flex-start">
            <HStack spacing={2}>
                <Text>{label}</Text>
                <Tooltip label={AMBIGIOUS_CHARS} aria-label={AMBIGIOUS_CHARS}>
                    <QuestionIcon />
                </Tooltip>
            </HStack>
            <Switch
                defaultChecked={isAmbigious}
                onChange={(event) => updateAmbigious(event.target.checked)}
            />
        </HStack>
    );
};

type GeneratorSettingProps = {
    value: number;
    onChange: (value: number) => void;
    label: string;
    tooltipLabel: string;
    min?: number;
    max?: number;
};

const GeneratorSetting: ChakraComponent<"div", GeneratorSettingProps> = ({
    value,
    onChange,
    label,
    tooltipLabel,
    min = 0,
    max = 20,
}) => {
    return (
        <HStack id="generatorSettings" spacing={4} width="100%">
            <HStack spacing={2}>
                <Text>{label}</Text>
                <Tooltip label={tooltipLabel} aria-label={tooltipLabel}>
                    <QuestionIcon />
                </Tooltip>
            </HStack>
            <Slider
                value={value}
                min={min}
                max={max}
                onChange={onChange}
                aria-label={label}
            >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>
            <Input isReadOnly value={value} width="75px" />
        </HStack>
    );
};
