/*
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle } from 'lucide-react';

interface FeatureComparisonProps {
    feature: string;
    neon: string;
    supabase: string;
}

const FeatureComparison: React.FC<FeatureComparisonProps> = ({ feature, neon, supabase }) => (
    <div className="mb-4 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">{feature}</h3>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <h4 className="font-medium mb-1">Neon</h4>
                <p className="text-sm">{neon}</p>
            </div>
            <div>
                <h4 className="font-medium mb-1">Supabase</h4>
                <p className="text-sm">{supabase}</p>
            </div>
        </div>
    </div>
);

interface Feature {
    feature: string;
    neon: string;
    supabase: string;
}

const ToolComparison: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'features' | 'summary'>('features');

    const features: Feature[] = [
        {
            feature: "CSV Import",
            neon: "Use the \\copy command in psql to import CSV data directly into tables. Ideal for structured, smaller datasets.",
            supabase: "Supabase Dashboard supports CSV import up to 100MB through a user-friendly interface."
        },
        {
            feature: "pg_dump and pg_restore",
            neon: "Standard method for migrating data from another Postgres database using pg_dump to export and pg_restore to import.",
            supabase: "pgloader can be used for large-scale imports from various databases, offering robust configuration options."
        },
        {
            feature: "CLI Tools",
            neon: "@neondatabase/pg-import CLI for simpler migrations, though it is experimental and best for smaller databases.",
            supabase: "Supabase API allows programmatic data import, useful for automation and providing control over the import process."
        },
        {
            feature: "Project-to-Project Migration",
            neon: "Directly pipe data from one Neon project to another using pg_dump and pg_restore, efficient for small datasets.",
            supabase: "Not explicitly mentioned, but possible via pgloader or the COPY command for complex or larger data migrations."
        },
        {
            feature: "AWS Database Migration Service (DMS)",
            neon: "Suitable for complex migrations from various database engines like MySQL, Oracle, and SQL Server to Neon.",
            supabase: "Supabase supports migration from Amazon RDS (Postgres, MySQL, MS SQL) using standard tools or dedicated migration tools."
        }
    ];

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <h2 className="text-2xl font-bold">Neon vs Supabase: Feature Comparison</h2>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={(value: 'features' | 'summary') => setActiveTab(value)}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="features">Features</TabsTrigger>
                        <TabsTrigger value="summary">Summary</TabsTrigger>
                    </TabsList>
                    <TabsContent value="features">
                        {features.map((item, index) => (
                            <FeatureComparison key={index} {...item} />
                        ))}
                    </TabsContent>
                    <TabsContent value="summary">
                        <div className="space-y-4">
                            <p>
                                Both Neon and Supabase offer robust data migration and import capabilities, but they cater to slightly different use cases:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    <strong>Neon</strong> excels in PostgreSQL-native operations and offers flexibility for smaller, structured datasets.
                                </li>
                                <li>
                                    <strong>Supabase</strong> provides more user-friendly interfaces and supports larger-scale imports, making it suitable for bigger projects.
                                </li>
                            </ul>
                            <p>
                                Your choice between Neon and Supabase should depend on your specific project requirements, data volume, and preferred level of control over the import process.
                            </p>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default ToolComparison;*/
